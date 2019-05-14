import React from 'react';

const NavbarModal = ({ modalOpen, toggleModal }) => (
	<div className={modalOpen ? 'modal is-active' : 'modal'}>
		<div className="modal-background"></div>
		<div className="modal-content">
			<div className="level">
				<p className="level-item">
					<a className="link has-text-white is-size-3">Home</a>
				</p>
				<p className="level-item">
					<a className="link has-text-white is-size-3">Documentation</a>
				</p>
			</div>
			<div className="level">
				<p className="level-item">
					<a className="link has-text-white is-size-3">Home</a>
				</p>
				<p className="level-item">
					<a className="link has-text-white is-size-3">Documentation</a>
				</p>
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