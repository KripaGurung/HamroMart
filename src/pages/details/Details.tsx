import React, {useState, useEffect} from "react";
import axios from "axios";
import {productDetailsURL} from "../../api";
import {useParams, useNavigate} from "react-router-dom";
import './Details.css';

interface DetailsData {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    category: string;
    description: string;

}

const Details: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ details, setDetails ] = useState<DetailsData[]>([]);

    useEffect(() => {
        const fetchdetails = async () => {
            try {
                const response = await axios.get(`${productDetailsURL}/${id}`);
                setDetails([response.data]);
            } catch (error) {
                console.error("Failed to fetch the product details!", error);
            }
        };
        fetchdetails();
    }, [id]);

    return(
        <div className="detailsContainer">
            <div onClick={() => navigate(-1)} className="arrow">←</div>
            <div className="details">
                {details.map((product) => (
                    <div key={product.id} className="detailsCard">
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>{product.category}</p>
                        <p>{product.description}</p>
                        <p>${product.price}</p>

                        <div className="detailsButton">
                            <button>add to cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Details;