import { Route, Redirect, Switch } from 'react-router-dom';
import Memories from '../components/pages/Memories';
import AddForm from '../components/pages/Form/AddForm';

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Redirect to="/memories" />
			</Route>
			<Route path="/memories">
				<Memories />
			</Route>
			<Route path="/add-memory">
				<AddForm />
			</Route>
			<Route path="*">
				<h3 style={{ textAlign: 'cenetr' }}>Access denies</h3>
			</Route>
		</Switch>
	);
};

export default Routes;
