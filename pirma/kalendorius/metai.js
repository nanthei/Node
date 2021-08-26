const metai=(metai)=>{
if (metai> 1895 && metai%4===0) return ' metai yra olimpiniai. Olimpiniu zaidiniu numeris: ' + (metai-1892)/4;
else return ' metai nera olimpiniai';

    // let cm=metai - 1983;
    // switch (cm % 10){
    //     case 1:
    //     case 2: return "Žalia";
    //     case 3:
    //     case 4: return "Raudona";
    //     case 5:
    //     case 6: return "Geltona";
    //     case 7:
    //     case 8: return "Balta";
    //     case 9:
    //     case 0: return "Juoda";
    // }
    
 };
 
 module.exports=metai;