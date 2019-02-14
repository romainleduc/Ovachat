import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd'
import { connect } from 'react-redux';
import {authAction} from '../../actions/authAction'
import './index.css'

class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            submitted: false
        }
    }

    componentDidMount() {
        (async () => {
            try {
                this.props.dispatch(await authAction.autoLogin())
            } catch (e) {
            }
        })()
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {username, password} = this.state

        this.setState({
            submitted: true
        })

        if(username && password) {
            (async () => {
                try {
                    this.props.dispatch(await authAction.login(username, password))
                } catch (e) {
                    console.log(e)
                }
            })()    
        }
    }

    render = () => {
        const {username, password, submitted} = this.state

        return(
            <div id="auth-login">
                <div className="wrapper-errors">
                </div>
                <h3>Se connecter</h3>
                <Form className="auth-form" onSubmit={this.handleSubmit}>
                    <Form.Item className="auth-item">
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Pseudo" onChange={(e) => {
                            this.setState({
                                username: e.target.value
                            })
                        }} />
                    </Form.Item>
                    {submitted && !username &&
                        <div>Le pseudo est requis</div>
                    }
                    <Form.Item className="auth-item">
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mot de passe" onChange={(e) => {
                            this.setState({
                                password: e.target.value
                            })
                        }}/>
                    </Form.Item>
                    {submitted && !password &&
                        <div className="help-block">Le mot de passe est requis</div>
                    }
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Valider
                    </Button>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state.authReducer
    return {
        loggedIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 