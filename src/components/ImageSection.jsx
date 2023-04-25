// video section in main landing page's bottom
import React, { useState } from "react";
import "./ImageSection.css";
import Spinner from "react-spinners/ClipLoader";

const VideoSection = () => {
    const [isLoading, setIsLoading] = useState([true, true, true]);

    const handleOnLoad = () => {
      setIsLoading(false);
    };

  const images = [
    {
      title: "Events",
      url: "https://e3977e9a34.clvaw-cdnwnd.com/e7d07c92a18fc1b8477259494b529e55/200000043-f40b5f40b8/67194205_1355372301294029_333073077422260224_o%20copia.jpg?ph=e3977e9a34",
      description: "Join the Right Community",
      link: "https://www.dronisos.com/?campaignid=16736879412&adgroupid=136768288484&keyword=drone%20show&device=c&utm_term=drone%20show&utm_campaign=Search+%7C+Europe+-+EN&utm_source=adwords&utm_medium=ppc&hsa_acc=9391370250&hsa_cam=16736879412&hsa_grp=136768288484&hsa_ad=655326505863&hsa_src=g&hsa_tgt=kwd-296897592624&hsa_kw=drone%20show&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad=1&gclid=Cj0KCQjwxYOiBhC9ARIsANiEIfaPOrOaSi89Dwl9Z3zdjhEl5Hk16PL4u_VTzvAPDyCP5ZAhOgxeoaoaAhc2EALw_wcB",
    },
    {
      title: "Enterprise",
      url: "https://www.pwc.com.au/digitalpulse/2019/08/business-dones-101-wp.jpg",
      description: "Find Custom Solutions",
      link: "https://mtidrones.com/pages/aerial-surveying-and-aec",
    },
    {
      title: "Agriculture",
      url: "https://i0.wp.com/asiatimes.com/wp-content/uploads/2018/12/iStock-938782966.jpg?resize=1200%2C799&ssl=1",
      description: "Enhance your Prodcutivity",
      link: "https://www.deltaquad.com/vtol-drones-for/agriculture/?utm_term=&utm_campaign=EN+-+Competitors&utm_source=adwords&utm_medium=ppc&hsa_acc=1674375646&hsa_cam=19927890872&hsa_grp=147610074373&hsa_ad=653578366725&hsa_src=g&hsa_tgt=dsa-2061082170407&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad=1&gclid=Cj0KCQjwxYOiBhC9ARIsANiEIfb19Pn-s3bGC0b29zvpSY8PiAVU8cDBe4wBhPfJsfqCKhroAQvO7ccaAif9EALw_wcB",
    },
  ];

  return (
    <div className="image-section">
      <hr />
      <div className="image-container">
        {isLoading && <Spinner />}
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img
              src={image.url}
              alt={image.title}
              onLoad={handleOnLoad}
              className="image"
            />
            <div className="image-text">
              <h1>{image.title}</h1>
              <p>{image.description}</p>
              <a href={image.link}>Learn More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default VideoSection;
