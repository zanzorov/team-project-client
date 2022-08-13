import Title from "../../components/Property/Title";
import Overview from "../../components/Property/Overview";
import Description from "../../components/Property/Description";
import Address from "../../components/Property/Address";
import Calculator from "../../components/Property/Calculator";
import Showing from "../../components/Property/Showing";
import PhotoGallery from "../../components/Property/PhotoGallery/PhotoGallery";

import styles from "../../components/Property/Property.module.css";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/apartment");
  const data = await res.json();

  const paths = data.map((apartment) => {
    return {
      params: { id: apartment._id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`http://localhost:5000/apartment/${id}`);
  const data = await res.json();
  // console.log(data)
  return {
    props: { apartment: data },
  };
};

const property = ({ apartment }) => {
  return (
    <div className={styles.wrapper}>
      <PhotoGallery apartment={apartment} />
      <div className={styles.container}>
        <Title apartment={apartment} />
        <div className={styles.main_content}>
          <div className={styles.info}>
            <Overview apartment={apartment} />
            <Description apartment={apartment} />
            <Address apartment={apartment} />
            <Calculator />
          </div>
          <div className={styles.showing}>
            <Showing apartment={apartment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default property;
