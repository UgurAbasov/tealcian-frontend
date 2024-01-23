import { useRef, useState } from "react"

const Profile = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const url = event.target.result;
        setImageUrl(url);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleButtonClick = () => {
    if(inputRef.current){
        inputRef.current.click()
    }
  };
    return (
        <div className=" h-[100%] w-[100%]">
    <div className=" flex mt-10 w-[40%]  mr-auto ml-auto opacity-[0.5]">
        <div className=" w-32 h-32 bg-black rounded-full">
        <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
        ref={inputRef}
      />
      <button onClick={handleButtonClick}>Choose Image</button>
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
        </div>
      )}
        </div>
        <h1 className=" text-2xl mt-auto mb-auto ml-auto mr-2 overflow-hidden">Ugur Abbasov</h1>
    </div>
    </div>
    )
}

export default Profile