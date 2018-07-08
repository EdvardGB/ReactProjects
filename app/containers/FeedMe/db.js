export default class DB {
    constructor(){
        this.data = [
            {
                name: "mat1",
                info: "kakk og lugge",
                param: "param"
            },
            {
                name: "mat2",
                info: "kakk og lugge",
                param: "param"
            },
            {
                name: "mat3",
                info: "kakk og lugge",
                param: "param"
            }
        ]

    }
    
    add(object){
        this.data.append(object)
    }

}
