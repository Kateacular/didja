import React from 'react';
import ReactDOM from 'react-dom';

import JqxResponsivePanel from '../../../jqwidgets-react/react_jqxresponsivepanel.js';
import JqxPanel from '../../../jqwidgets-react/react_jqxpanel.js';
import JqxMenu from '../../../jqwidgets-react/react_jqxmenu.js';
import JqxButton from '../../../jqwidgets-react/react_jqxbuttons.js';

class App extends React.Component {
    componentDidMount() {
        this.refs.myResponsivePanel.on('open expand close collapse', (event) => {
            if (event.args.element)
                return;
            let collapsed = this.refs.myResponsivePanel.isCollapsed();
            let opened = this.refs.myResponsivePanel.isOpened();
            if (collapsed && !opened) {
                this.refs.myPanel.width('100%');
            }
            else if (collapsed && opened) {
                this.refs.myPanel.width('64%');
            }
            else if (!collapsed) {
                this.refs.myPanel.width('64%');
            }
        });
        this.refs.myResizeSmallButton.on('click', () => {
            this.refs.myPanel.width('100%');
            document.getElementById('ownerPanel').style.width = '500px';
            this.refs.myResponsivePanel.refresh();
        });
        this.refs.myResizeBigButton.on('click', () => {
            this.refs.myPanel.width('64%');
            document.getElementById('ownerPanel').style.width = '800px';
            this.refs.myResponsivePanel.refresh();
        });
    }
    render() {
        let responsivePanelHTML = `<div id="jqxMenu" style="border: none; visibility: hidden;"/>`;
        let menuHTML = `
        <ul>
            <li><a href="#">Home</a></li>
            <li>About Us
            <ul>
                <li><a href="#">History</a></li>
                <li><a href="#">Our Vision</a></li>
                <li><a href="#">The Team</a>
                    <ul>
                        <li><a href="#">Brigita</a></li>
                        <li><a href="#">John</a></li>
                        <li><a href="#">Michael</a></li>
                        <li><a href="#">Peter</a></li>
                        <li><a href="#">Sarah</a></li>
                    </ul>
                </li>
                <li><a href="#">Clients</a></li>
                <li><a href="#">Testimonials</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">FAQs</a></li>
            </ul>
            </li>
            <li>Services
            <ul>
                <li><a href="#">Product Development</a></li>
                <li><a href="#">Delivery</a></li>
                <li><a href="#">Shop Online</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Training &amp; Consulting</a></li>
            </ul>
            </li>
            <li>Products
            <ul>
                <li><a href="#">New</a>
                    <ul>
                        <li><a href="#">Corporate Use</a></li>
                        <li><a href="#">Private Use</a></li>
                    </ul>
                </li>
                <li><a href="#">Used</a>
                    <ul>
                        <li><a href="#">Corporate Use</a></li>
                        <li><a href="#">Private Use</a></li>
                    </ul>
                </li>
                <li><a href="#">Featured</a></li>
                <li><a href="#">Top Rated</a></li>
                <li><a href="#">Prices</a></li>
            </ul>
            </li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact Us</a>
                <ul>
                    <li><a href="#">Enquiry Form</a></li>
                    <li><a href="#">Map &amp; Driving Directions</a></li>
                    <li><a href="#">Your Feedback</a></li>
                </ul>
            </li>
        </ul>
        `;
        let panelHTML = `
          <h4 style="text-align: center;">About Us</h4>
          <p style="line-height: 1.5;">
              <span style="float: left; font-size: 3.26em; line-height: 0.5; margin-top: 0.2em;">S</span><strong>tark
              Industries</strong> is a multinational conglomerate with facilities in over
          thirty different countries on all seven continents. The President and CEO of Stark
          Industries is billionaire industrialist Anthony "Tony" Stark.
          </p>
          <p>
              The company&#39;s origins date back to the mid-19 century when Isaac Stark, Sr. began
          developing new electrical and engineering technology that helped to redefine innovative
          security measures for the industrial age.
          </p>
          <p>
              With growing prosperity, Stark Industries (then known as Stark Enterprises) was
          quickly propelled into the modern era as a major global industrial superpower, due
          in no small measure to Isaac Stark, Sr.&#39;s direct descendant Howard Stark. Under
          Howard Stark&#39;s leadership, Stark Industries became the world leader in the development
          of munitions with its corporate office located on Long Island, New York. Stark Industries
          quickly branched out into other scientific fields including aeronautics, robotics,
          micro-technology and fringe science. With increasing expansion, the company soon
          became known as Stark Industries. When Howard Stark passed away, his sole heir Tony
          Stark inherited all of his father&#39;s business assets and took full control of Stark
          Industries.
          </p> `;
        return (
            <div>
                <div id="ownerPanel" style={{ height: 300, width: 800 }}>
                    <div style={{ boxSizing: 'border-box', marginBottom: 2, width: '100%', height: 50, padding: '10px 0 0 10px' }}>
                        <div id="toggleResponsivePanel" />
                    </div>
                    <JqxResponsivePanel ref='myResponsivePanel' style={{ display: 'inline' }}
                        width={'100%'} height={'100%'} collapseBreakpoint={700} autoClose={false}
                        toggleButton={'#toggleResponsivePanel'} animationType={'none'}
                    >
                        <JqxMenu template={menuHTML} style={{ float: 'left' }}
                            width={'30%'} height={'100%'}
                            mode={'vertical'} />
                    </JqxResponsivePanel>
                    <JqxPanel ref='myPanel' template={panelHTML} width={'64%'} height={'100%'} style={{ float: 'left' }} />
                </div>
                <div style={{ paddingTop: 20, clear: 'both' }}></div>
                <JqxButton ref='myResizeSmallButton' value='Resize Panel to 500px' style={{ float: 'left', marginRight: 10 }}
                    width={180} height={25}
                />
                <JqxButton ref='myResizeBigButton' value='Resize Panel to 800px'
                    width={180} height={25}
                />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
