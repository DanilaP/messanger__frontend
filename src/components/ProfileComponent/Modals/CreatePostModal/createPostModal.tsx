import { useEffect, useState } from 'react';
import './createPostModal.scss';
import $api from '../../../../api';
import serverAdress from '../../../../serverAdress';

function CreatePostModal(props: {close: VoidFunction}) {

    const [postInfo, setPostInfo] = useState<{image?: FileList | null, text?: string}>();
    const [choosenImage, setChoosenImage] = useState<string>("");

    const createPost = async () => {
        let formData = new FormData();

        if (postInfo && postInfo.image) {
            formData.append('postImage', postInfo.image[0]);
        }
        if (postInfo && postInfo.text) {
            formData.append('postText', postInfo.text);
        }

        await $api.post(serverAdress + '/posts/createPost', formData)
        .then((res) => {
            props.close();
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
    }  

    const chooseImage = (imageFile: FileList | null) => {
        if (imageFile?.length !== 0) {
            setPostInfo({...postInfo, image: imageFile});
            setChoosenImage(URL.createObjectURL(imageFile![0]));
        }
    }

    return (
        <div className="PostModal">
            <div className="PostModal__main">
                <div onClick={props.close} className="PostModal__main__closeButton">x</div>
                <textarea onChange={(e) => setPostInfo({...postInfo, text: e.target.value})} placeholder='Содержимое поста' />
                <img src = {choosenImage} width={"200px"} height={"200px"} alt='Выбранное изображение'/> 
                <div className="PostModal__main_buttons">
                    <label className="input__file">
                        <input onChange={(e) => chooseImage(e.target.files)} 
                            accept="image/*" 
                            type="file" 
                            name="file"
                        />		
                        <span>Добавить изображение</span>
                    </label>
                    <button onClick={createPost}>Подтвердить</button>
                </div>
            </div>
        </div>
    );
}

export default CreatePostModal;
