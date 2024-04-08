import { Link } from 'react-router-dom';

export interface HomeProps {}

const Home = (): JSX.Element => {
  return (
    <div>
      <Link to="/favorites">Favorites</Link>
    </div>
  );
};

export default Home;
