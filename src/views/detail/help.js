export const transportTypeDictionary =(k)=>{
    if(k == 'ShippingFCL'){
        return "海运整箱";
    }else if(k == 'ShippingLCL'){
        return "海运拼箱";
    }else if(k == 'Air'){
        return '空运';
    }else if(k == 'RailwayFCL'){
        return '铁路整箱';
    }else if(k == 'RailwayLCL'){
        return '铁路拼箱';
    }else{
        return ' ';
    }
}