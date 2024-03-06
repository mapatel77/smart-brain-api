const { json } = require("body-parser");

const returnClarifaiRequestOptions = (imageUrl) => {

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = '66f1bf23dd9649fdbae341a70e693590';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'mfs3jydk8v6t';       
  const APP_ID = 'facerecognitionbrain';
  // Change these to whatever model and image URL you want to use
  //const MODEL_ID = 'face-detection';  
  const IMAGE_URL = imageUrl;
  
  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });
  
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };
   return requestOptions
  }

const handleApiCall = (req, res) =>{
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(req.body.input))
    .then(response=>response.json())
    .then(data=>{
        res.json(data);
    })
    .catch(err=>res.status(400).json('Error with API call'));    
}
  

  

const handleImage = (req, res, db)=>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0].entries);
    })
    .catch(err=> res.status(400).json('unable to get entries')
    )
}

module.exports = {
    handleImage: handleImage,
    handleApiCall
}