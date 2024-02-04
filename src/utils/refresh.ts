const refresh = async (refreshToken: any) => {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "<origin>",
           },
        body: JSON.stringify({
            refreshToken
        })
    })
    const data = response.json()
    return data
}

export default refresh