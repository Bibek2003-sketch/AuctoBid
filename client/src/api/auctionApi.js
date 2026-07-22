import API from "./axios"

// GET all auctions
export const getAllAuctions = async () => {
    const response = await API.get('/auctions')
    return response.data
}

// get single Auction
export const getAuctionById = async () => {
    const response = await API.get(`/auctions/${id}`)
    return response.data
}

// GET logged-In  sellers auctions
export const getMyAuctions = async () => {
    const token = localStorage.getItem("token")

    const response = await API.get('/auctions/my-auctions',{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

// Create Auction
export const createAuction = async (auctionData) => {
    const token = localStorage.getItem('token')

    const response = await API.post(
        '/auctions',
        auctionData,
        {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
    )
    return response.data
}

export const deleteAuction = async (id) => {
  const token = localStorage.getItem("token");

  const response = await API.delete(`/auctions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};