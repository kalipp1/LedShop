import { useEffect } from "react";
import styles from "./AdminClientsListPage.module.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { loadClientsRequest, getClients } from "../../../redux/clientsRedux";
import { useSelector } from "react-redux";

const AdminClientsListPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clients = useSelector(getClients);

    useEffect(() => {
        dispatch(loadClientsRequest());
    }, [dispatch]);


    const handleReadMore = (id) => {
        navigate(`/admin/clients/${id}`);
    };

    return (
        <div className={styles.clientsContainer}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faCircleArrowLeft} />
            </button>
            <h1>Client Management</h1>
            {clients.length === 0 ? <p>No clients found</p> : (
                <ul>
                    {clients.map(client => (
                        <li className={styles.clientListItem} key={client.id}>
                            <button className={styles.buttonMore} onClick={() => handleReadMore(client.id)}>
                                More
                            </button>
                            <span className={styles.clientText}>
                            ClientId: #{client.id} -- {client.name} -- {client.email}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminClientsListPage;