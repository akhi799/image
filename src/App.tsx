import React,{useState,useEffect}from 'react';
import { FileUploader,Collection ,useAuthenticator,Button,withAuthenticator} from '@aws-amplify/ui-react';
import './App.css';
import {Storage} from "aws-amplify"
import "@aws-amplify/ui-react/styles.css"
import {S3ProviderListOutputItem} from "@aws-amplify/storage"
import { ImageCard } from './ImageCard';

function App() {
  const [imageKeys,setimageKeys] =useState<S3ProviderListOutputItem[]>([]);
  const [images,setImages] = useState<string[]>([]);
  const {signOut}=useAuthenticator((context)=>[context.signOut])
  const fetchImages=async ()=> {
    const {results}=await Storage.list("",{level:"public"});
    setimageKeys(results);
    const s3Images=await Promise.all(
      results.map(
      async image=>await Storage.get(image.key!,{level:"public"})
      )
      );
      setImages(s3Images);
      
      
  }
  useEffect(() => {
    fetchImages();
  },[]);

  const onSuccess=(event:{key:string})=>{
    fetchImages();
  }
  return (
    <>
    
    <FileUploader
    accessLevel='public'
    acceptedFileTypes={['image/*']}
    variation='drop'
    onSuccess={onSuccess}
    />
    <Collection
    items={images}
    type="grid"
    padding="2rem"
    maxWidth="1100px"
    margin="0 auto"
    justifyContent="center"
    templateColumns={{
      base:"minmax(0,500px)",
      medium:"repeat(2,minmax(0,1fr))",
      large:"repeat(3,minmax(0,1fr))"
    }}
    gap="small"
    >
      {(item,index)=>(
        <ImageCard
        key={index}
        imageKeys={imageKeys}
        item={item}
        index={index}
        />


          
        
        )}
        
    </Collection>
    <Button onClick={signOut}>Sgn out</Button>
    </>
  );
}

export default withAuthenticator(App);
