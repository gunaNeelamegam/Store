
import { BACK_END_API } from "../../Backend"

// router.route("/reviews").get(isLoggedIn, getOnlyReviewsForOneProduct);

//TODO :

// const product = await Product.findById(req.query.id);

export const getSingleProductReviews = async (token) => {
    const response = await fetch(`${BACK_END_API}/reviews`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    return response.json()
}


//TODO : 

//const { rating, comment, productId } = req.body;

export const addReview = async (token, formdata) => {
    const response = await fetch(`${BACK_END_API}/review`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    })

    return await response.json()
}

export const getSingleProduct = async (token, id) => {

    const response = await fetch(`${BACK_END_API}/product/${id}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    await response.json()
}


export const addProduct = async (token, formdata) => {

    const response = await fetch(`${BACK_END_API}/admin/product/add`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    })
    return response.json()

}

// base - Product.find()
// base - Product.find(email: {"gunag5127@gmail.com"})

//bigQ - //search=coder&page=2&category=shortsleeves&rating[gte]=4
// &price[lte]=999&price[gte]=199&limit=5


export const getAllCategory = async (token) => {

    const response = await fetch(`${BACK_END_API}/allCategories`, {
        method: "get",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    return await response.json()
}

export const getAllProducts = async (token, catagoryName, page = 1, limit = 2) => {
    const response = await fetch(`${BACK_END_API}/products?page=${page}&category=${catagoryName}&limit=${limit}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return await response.json()
}


// router
//   .route("/admin/product/:id")
//   .put(isLoggedIn, customRole("admin"), adminUpdateOneProduct)
//   .delete(isLoggedIn, customRole("admin"), adminDeleteOneProduct);


export const manipulateProducts = async (token, id, methodType, formdata = null) => {
    const response = await fetch(`${BACK_END_API}/admin/${id}`, {
        method: `${methodType}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token} `
        },
        body: formdata
    })
    return await response.json()
}