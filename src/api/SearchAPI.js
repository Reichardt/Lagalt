import axios from "axios";

const SearchAPI = {
  async search(query) {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/projects/search?searchString=${query}`
    );
    const data = res.data;
    return data;
  },
};

export default SearchAPI;
