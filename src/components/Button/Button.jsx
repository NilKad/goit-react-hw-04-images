import css from './Button.module.css';

export const Button = ({ text, onClickButton }) => {
  return (
    <button type="button" className={css.button} onClick={onClickButton}>
      {text}
    </button>
  );
};
