type PlaceHolderMessageProps = {
  message: string;
};

const PlaceHolderMessage = ({ message }: PlaceHolderMessageProps) => {
  return (
    <section>
      <h1>{message}</h1>
    </section>
  );
};

export default PlaceHolderMessage;
