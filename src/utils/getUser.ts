const getUser = async (token: any) => {
    const response = fetch('https://tealcian-backend-production-3d2b.up.railway.app/auth/profile', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "<origin>",
            "Authorization": `Bearer ${token}`
        },
    })
    const data = (await response).json()
        .then(res => {
            if (res.id) {
                localStorage.setItem('userId', res.id);
            } else {
                console.log(res);
            }
        })
        ;
    return data
}


export default getUser