import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollButton(){

const [visible,setVisible] = useState(false);


useEffect(()=>{

const handleScroll = ()=>{

if(window.scrollY > 400){
setVisible(true);
}
else{
setVisible(false);
}

};


window.addEventListener("scroll",handleScroll);


return()=>window.removeEventListener("scroll",handleScroll);


},[]);



const scrollTop = ()=>{

window.scrollTo({
top:0,
behavior:"smooth"
});

};



return(

visible && (

<button
onClick={scrollTop}
className="
fixed
bottom-8
right-8
bg-pink-500
text-white
w-14
h-14
rounded-full
shadow-xl
flex
items-center
justify-center
hover:bg-pink-600
hover:scale-110
transition
z-50
"
>

<FaArrowUp />

</button>

)

);

}

export default ScrollButton;