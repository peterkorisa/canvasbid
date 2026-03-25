const CreateArtwork = () => {
  return (
    <div className="flex flex-col">
      <div className="">
        <h1 className="">Add your latest artwork</h1>
      </div>
      <form action="" className="flex flex-col">
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">
              Enter artwork's title
            </legend>
            <input
              type="text"
              className="input text-black"
              placeholder="Type here"
            />
          </fieldset>
        </div>
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">
              Enter artwork's description
            </legend>
            <input
              type="text"
              className="input text-black"
              placeholder="Type here"
            />
          </fieldset>
        </div>
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">
              Enter artwork's initial price
            </legend>
            <input
              type="number"
              className="input text-black"
              placeholder="Type here"
            />
          </fieldset>
        </div>
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">
              Enter artwork's start time
            </legend>
            <input type="datetime-local" className="input text-black" />
          </fieldset>
        </div>
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">
              Enter artwork's end time
            </legend>
            <input type="datetime-local" className="input text-black" />
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default CreateArtwork;
