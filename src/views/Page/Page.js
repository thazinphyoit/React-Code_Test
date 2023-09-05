import React, { useEffect, useState } from 'react';

const Card = ({title,text,target,linkTitle,href,rel,onClick,linkClassName}) => {
    return (
      <div className="card" style={{border:'2px solid black'}}>
  
          <div className="card__title">{title}</div>
  
          <div className="card__text">{text}</div>
          <a className={`default-link card__link ${linkClassName}`} target={target} rel={rel} href={href} onClick={onClick}>
            {linkTitle}
          </a>
      </div>
    );
}

const Page = () => {
  const [cards, setCards] = useState([]);

  const getData = async () => {
        await fetch('https://my-json-server.typicode.com/savayer/demo/posts')
        .then(response => response.json())
        .then(data => {
            let newDataArr = data?.map((item) => {
                let newData = {};
                newData.id = item?.id;
                newData.title = item?.title;
                newData.link_title = item?.link_title;
                newData.link = item?.link;
                newData.text = item?.body?.en?.substr(0, 50) + '...';
                return newData;
            }) || [];
            setCards(newDataArr);
        })
        .catch(error => console.log(error));
    }

  useEffect(() => {
    getData();
  }, []);

  const analyticsTrackClick = (url) => {
    console.log(url);
  }

  return (
    <div>
    {cards?.map( item => {
      return (
        <Card key={item.id} title={item.title.en} linkTitle={item.link_title} href={item.link} text={item.text} linkClassName={item.id === 1 ? 'card__link--red' : ''} target={item.id === 1 ? '_blank' : ''}
          onClick={()=>analyticsTrackClick(item.link)} />
      );
    })}
    </div>
  );
}

export default Page;
