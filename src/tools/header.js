import { useNavigate } from 'react-router-dom'
import styles from './header.module.css'

const Header = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.header}>
            <h1 className={styles.title} onClick={() => navigate('/home')}>GOMOKU</h1>
        </div>
    )
}

export default Header