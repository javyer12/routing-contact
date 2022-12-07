import '../styles/animation.scss';

export default function Index() {
    return (
        <div className="index">
            <div className="letter-image">
                <div className="animated-mail">
                    <div className="back-fold"></div>
                    <div className="letter">
                        <div className="letter-border"></div>
                        <div className="letter-title"></div>
                        <div className="letter-context"></div>
                        <p className="text">Welcome to <br />Contact paradise</p>
                        <div className="letter-stamp">
                            <div className="letter-stamp-inner"></div>
                        </div>
                    </div>
                    <div className="top-fold"></div>
                    <div className="body"></div>
                    <div className="left-fold"></div>
                </div>
                <div className="shadow"></div>
            </div>
            <p id="welcome-message">
                Click "New" button to  <br /> create a new contact.
                <br />
            </p>
        </div >
    )
}