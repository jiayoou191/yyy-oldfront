// 手机号验证
export function isvalidPhone(str) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
  }

//邮箱验证
  export function isvalidEmail(str) {
    const reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
    return reg.test(str)
  }

  //  * 密码包含 数字,英文,字符中的两种以上，长度6-12 
  export function isvalidPassword(str) {
    const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,12}$/
    return reg.test(str)
  }

export const arrayPush =(array,arr,set)=>{
    array = array.map((i,j)=>{
      arr.map((o,p)=>{
        if(i.id == o.id){
          // i["back"] = o.back;
          set(i,'back',o.back);         
          // i ={...i,'back':o.back};
          return i
        }
      })
    })
}
