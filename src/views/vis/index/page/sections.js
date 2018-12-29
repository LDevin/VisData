import React from 'react';
import {connect} from 'react-redux';


 class Section extends React.Component {
    render() {
        return(
            <div>{this.props.token} ddddddddddddd</div>
        )
    }
}

export default connect( state=> {
    return {token: state.com.curType}
})(Section)