import { type } from 'os';
import './styles.css';

type PrivateProps = {
  title: string;
  description: string;
}

export default function ItemList({title, description}: PrivateProps) {
    return (
      <div className='item-list'>
        <strong>{title}</strong>
        <p>{description}</p>
        <hr />
      </div>
);

}