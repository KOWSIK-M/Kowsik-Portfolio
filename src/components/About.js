import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Typewriter from 'typewriter-effect';
import './About.css';
import Img1 from '../images/kowsik-p.jpg';

function SidePopup({ onClose }) {
    return (
        <div className="side-popup">
            <h4>Quick Links</h4>
            <a href="/path/to/your/resume.pdf" target="_blank" rel="noopener noreferrer">View My Resume</a>
            <button onClick={onClose}>Close</button>
        </div>
    );
}


export default function About() {
    const [showPopup, setShowPopup] = useState(false);
    
    return (
        <div>
            <div className='box'>
                <h3>Hi, I am Kowsik</h3>
            </div>

            <div style={{ display: "flex" }}>
                <Draggable>
                    <div className="aboutContent">
                        <div className="card">
                            <img
                                src={Img1}
                                alt="my pic"
                                onContextMenu={(e) => e.preventDefault()} // Prevents right-click options
                                draggable="false" // Disables drag functionality
                            />

                            <div className="content">
                                <p className="title">&nbsp;M KOWSIK<br /><span></span></p>
                                <ul className="sci">
                                    <li>
                                        <a href="/" aria-label="Facebook">
                                            <svg className="fa-brands fa-facebook" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" aria-label="Twitter">
                                            <svg className="fa-brands fa-twitter" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" aria-label="Linkedin">
                                            <svg class="fa-brands fa-linkedin-in" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="/" aria-label="Instagram">
                                            <svg class="fa-brands fa-instagram" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Draggable>

                <div class="card_container">
                    <div class="card_hover">
                        <div class="part part-1"></div>
                        <div class="part part-2"></div>
                        <div class="part part-3"></div>
                        <div class="part part-4"></div>
                        <div class="part part-5"></div>
                        <div class="part part-6"></div>
                        <div class="part part-7"></div>
                        <div class="part part-8"></div>
                        <div class="part part-9"></div>
                        <div class="part part-10"></div>
                        <div class="part part-11"></div>
                        <div class="part part-12"></div>
                        <div class="part part-13"></div>
                        <div class="part part-14"></div>
                        <div class="part part-15"></div>
                    </div>

                    <div class="card_info">
                        <div class="say-hi">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 71 74"
                                class="icon_say-hi"
                            >
                                <path
                                    fill="black"
                                    d="M43.6574 32.6925C46.2318 27.3745 42.4638 8.00882 50.0978 4.62384C53.3046 3.19858 56.1818 5.55916 57.0637 8.98869C58.7918 15.723 56.7074 24.034 54.9793 30.5011C54.712 31.5166 53.8925 33.7525 54.0261 34.7413C58.5781 27.5437 59.4243 18.9209 63.0587 16.3644C65.9894 14.2978 68.9201 15.4647 70.372 18.7339C72.8573 24.3369 65.6776 37.2266 62.4084 41.7963C67.0227 52.1917 65.9538 64.93 54.9347 70.4083C51.7814 71.21 49.0734 71.2813 45.9556 70.2569C45.9378 70.2569 45.6973 70.1767 45.6706 70.1678C41.0741 73.2588 30.358 73.7309 27.4362 72.3502C20.6395 68.8138 18.2522 61.8479 6.11974 55.3273C4.40052 54.4098 1.96868 53.2518 0.721583 51.0159C-2.53869 45.1902 6.16428 41.0748 14.3773 44.5666C16.7023 45.5554 20.5772 48.1565 22.2251 50.624C23.7395 49.7688 22.9556 47.9071 22.047 44.4954C19.3479 34.4206 8.0082 21.9763 9.7096 14.7699C10.8676 9.85275 16.0965 7.11804 20.0338 10.984C25.5923 16.4535 29.0574 27.9624 31.7031 35.2045C32.8166 34.4117 32.7453 35.2668 31.5873 30.9554C30.2689 26.0472 28.6388 21.1657 27.6322 16.3377C26.492 10.8415 24.746 2.69084 31.4091 0.321349C40.1744 -2.80531 42.2232 18.4132 42.8201 23.6421L43.6841 32.7014L43.6574 32.6925ZM46.5881 69.5888H46.8197C47.5769 69.5977 48.3608 69.6155 49.0823 69.66C51.8615 69.8293 52.8859 69.2146 55.2109 68.1813C63.9584 64.2975 64.6087 52.2452 61.0455 43.5155C60.3685 41.8497 60.6447 41.3509 61.3128 40.2285C64.4661 34.9016 71.343 24.8714 68.6439 18.8051C67.7442 16.792 64.8314 16.2129 63.032 18.333C60.9297 20.8094 59.3976 28.4702 57.0815 32.2916C56.5114 33.2358 55.7275 34.1444 55.2554 34.9818C56.0839 35.5163 55.9859 35.3114 56.4134 36.3981C55.1396 36.3001 51.6299 35.828 50.9886 35.0352C53.1086 34.0821 53.2423 31.8195 54.0885 27.9891C54.6764 25.3079 55.2554 22.9918 55.6385 20.0879C55.9859 17.46 56.3333 14.5116 56.0126 11.7412C55.6117 8.29387 53.9905 4.63275 50.1512 6.34305C44.6105 8.80162 47.7728 25.9314 44.8689 33.6456C45.8131 34.2068 45.8398 33.9039 46.5792 35.2312L39.9696 34.67C41.9738 32.9063 42.152 35.1332 41.083 26.3768C40.602 22.4574 39.3906 11.0019 38.1969 7.79503C36.2728 2.62848 34.4467 0.704387 30.5629 2.43251C27.2135 3.92012 28.9862 13.9414 29.4939 16.8098C29.9571 19.402 30.7856 22.4039 31.5427 25.1208L34.0013 33.8238C34.3754 34.6611 34.8119 34.2603 35.774 35.1421C33.4134 36.1933 31.0973 36.3269 28.8347 37.1731C28.8169 35.8904 29.6365 36.1487 30.3045 35.1154C28.4517 30.51 20.5415 8.29387 15.0009 10.7524C2.31609 16.3822 24.8975 35.7122 24.4165 49.3056C31.9347 45.8048 38.1078 49.4927 42.2678 54.9532C39.542 54.971 36.3708 48.3792 28.2736 49.9559C25.8417 50.428 24.5501 51.4257 22.3142 52.2096C19.7398 50.9357 16.5776 46.8203 12.088 45.3951C10.44 44.8695 -0.391898 43.8985 2.18247 49.7065C3.58991 52.8777 8.96134 54.6681 11.3576 56.1112C15.179 58.4094 17.0497 60.4048 20.2743 63.7898C34.028 78.2294 44.9669 67.54 47.6036 67.8339C47.3898 68.4842 46.9711 69.0721 46.3743 69.5977L46.5703 69.5888H46.5881ZM53.6698 46.5798L43.31 44.914C37.5644 44.3617 35.6938 45.1724 33.7608 45.1545C32.291 45.1456 33.1907 45.3951 32.5048 44.6379C34.0102 42.9454 41.6531 43.1948 43.693 43.2839C47.2295 43.4353 50.9708 44.2994 53.6698 46.5798Z"
                                    clip-rule="evenodd"
                                    fill-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <div class="title_info">
                            <span>Hi, I'm Kowsik</span>
                        </div>
                        <div class="paragraph">
                            <span>Passionate about creating, beautiful and functional websites</span>
                        </div>
                    </div>
                    <h1 style={{color:"white"}}>
                <Typewriter
                    options={{
                        strings: ['I code cool website', 'I love coding'],
                        autoStart: true,
                        loop: true,
                    }}
                />
                </h1>
                <div className="introduction">
  <p>
    Hi, I'm Kowsik, a Cloud Architect and tech enthusiast with a passion for building innovative solutions. 
    Currently, I'm exploring new avenues in self-driving SaaS applications and smart city tech with a focus on creating 
    efficient, user-friendly digital experiences.
  </p>
</div>
                </div>
                
            </div>
            <button onClick={() => setShowPopup(true)}>Show Resume Popup</button>

{showPopup && <SidePopup onClose={() => setShowPopup(false)} />}
        </div>
    );
}
