import React from 'react';
import { authenticated, logout } from '../../../auth';

const NavbarModal = ({ modalOpen, toggleModal, history }) => (
	<div className={modalOpen ? 'modal is-active' : 'modal'}>
		<div className="modal-background"></div>
		<div className="modal-content">
			<div className="level">
				<p className="level-item">
					<button data-testid="home-btn-navbar-modal" onClick={(e) => toggleModal(e, () => {
                      history.push('/home');
                    })}
						className="button is-large has-text-white custom-nav-button">
						Home
					</button>
				</p>
			</div>
			<div className="level">
			{
				authenticated() ?
				<p className="level-item">
					<button data-testid="logout-btn-navbar-modal" onClick={(e) => toggleModal(e, () => {
                      logout();
                      history.push('/');
                    })} className="button is-medium has-text-white custom-nav-button">
						Logout
					</button>
				</p> :
				<>
					<p className="level-item">
						<button data-testid="signup-btn-navbar-modal" onClick={(e) => toggleModal(e, () => {window.location.href='/#signup'})}
							className="button is-large has-text-white custom-nav-button">
						Signup
						</button>
					</p>
					<p className="level-item">
						<button data-testid="login-btn-navbar-modal" onClick={(e) => toggleModal(e, () => {window.location.href='/#login'})}
							className="button is-large has-text-white custom-nav-button">
						Login
						</button>
					</p>
				</>
			}
			</div>
			<div className="level">
				<div className="level-item">
					<span className="icon is-large has-text-info">
						<i className="fab fa-twitter fa-2x"></i>
					</span>
				</div>
				<div className="level-item">
					<span className="icon is-large has-text-info">
						<i className="fab fa-facebook fa-2x"></i>
					</span>
				</div>
				<div className="level-item">
					<span className="icon is-large has-text-white">
						<i className="fab fa-github fa-2x"></i>
					</span>
				</div>
				<div className="level-item">
					<span className="icon is-large has-text-white">
						<i className="fab fa-instagram fa-2x"></i>
					</span>
				</div>
			</div>
		</div>
		<button onClick={toggleModal} className="modal-close is-large" aria-label="close"></button>
	</div>
)

export default NavbarModal;
