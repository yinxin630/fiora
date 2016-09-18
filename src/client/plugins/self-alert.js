import api from '../common/api.js';
import $ from 'jquery'
let {
    registerCommand
}=api;
//on("message",function(msg){
//    if(msg.content.indexOf)
//})

registerCommand("boom",function(userName){
    let $name=$(".message-list-item").find(`.message-username:contains('${userName}')`);
    if(!$name.length){
        alert(`目标${userName}不存在`);
    }
    let $target=$name.last().parents(".message-list-item").find(".avatar-image");
    $target.css("transition","0.2s all")
            .css("opacity","0")
            .css("transform","scale(2)");
    setTimeout(function(){
        $target.css("opacity","")
            .css("transform","");        
        setTimeout(function(){
            $target.css("transition","0.2s all")
        },300)
    },1400);
    
})
