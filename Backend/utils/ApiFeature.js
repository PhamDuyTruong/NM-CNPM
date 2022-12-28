class ApiFeature{
    constructor(query, queryString){
        this.query = query,
        this.queryString = queryString
    }

    search(){
        const keyword = this.queryString.keyword ? {
            brand: {
                $regex: this.queryString.keyword,
                $options: "i"
            },
        }: {}
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter(){
        const queryCop = {...this.queryString};
        //Remove some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryCop[key]);
        let queryStr = JSON.stringify(queryCop);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
      }
};

module.exports = ApiFeature;