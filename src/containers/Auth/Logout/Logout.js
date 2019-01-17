import  React  from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../../store/actions/index';

class Logout extends React.Component{

    componentDidMount(){        
        this.props.onLogout();
    }

    render(){
        return <Redirect to="/auth" />;
    }
}


const mapDispatchertoProps = dispatcher => {
    return {
        onLogout: () => dispatcher(actions.logout())
    }
}

export default connect(null, mapDispatchertoProps)(Logout);