import '../styles/animation.scss';

export default function Index() {
    return (
        <div className="index">
            <div class="letter-image">
                <div class="animated-mail">
                    <div class="back-fold"></div>
                    <div class="letter">
                        <div class="letter-border"></div>
                        <div class="letter-title"></div>
                        <div class="letter-context"></div>
                        {/* <img src="../assets/c.jpeg" /> */}
                        {/* <p className="text">Welcome to Contact paradise</p> */}
                        <div class="letter-stamp">
                            <div class="letter-stamp-inner"></div>
                        </div>
                    </div>
                    <div class="top-fold"></div>
                    <div class="body"></div>
                    <div class="left-fold"></div>
                </div>
                <div class="shadow"></div>
            </div>
            <p id="welcome-message">
                Click "New" button to create a new contact.
                <br />
            </p>
        </div >
    )
}