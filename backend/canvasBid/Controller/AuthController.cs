using canvasBid.Dtos;
using canvasBid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace canvasBid.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var user = new User
            {
                UserName = dto.Email,
                Email = dto.Email,
                name = dto.fullName,
                status = dto.Role == "Artist" ? "Pending" : "Approved"
            };

            var result = await _userManager.CreateAsync(user, dto.password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await _userManager.AddToRoleAsync(user, dto.Role);

            return Ok("User Created");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
                return Unauthorized();

            var check = await _userManager.CheckPasswordAsync(user, dto.password);

            if (!check)
                return Unauthorized();

            var roles = await _userManager.GetRolesAsync(user);

            if (roles.Contains("Artist") && user.status != "Approved")
                return Unauthorized("Artist account is still pending approval or rejected.");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("pending-artists")]
        public IActionResult GetPendingArtists()
        {
            var artists = _userManager.Users.Where(u => u.status == "Pending").ToList();
            return Ok(artists);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("approve-artist/{id}")]
        public async Task<IActionResult> ApproveArtist(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();

            user.status = "Approved";
            await _userManager.UpdateAsync(user);

            return Ok("Artist Approved");
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("reject-artist/{id}")]
        public async Task<IActionResult> RejectArtist(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();

            user.status = "Rejected";
            await _userManager.UpdateAsync(user);

            return Ok("Artist Rejected");
        }
    }
}