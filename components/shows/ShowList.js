import ShowCard from './ShowCard';

const ShowList = ({ shows }) => {
  if (!shows || shows.length === 0) {
    return <p className="text-muted">No shows available at the moment.</p>;
  }

  return (
    <div className="row">
      {shows.map(show => (
        <div key={show.id} className="col-md-4 mb-4">
          <ShowCard show={show} />
        </div>
      ))}
    </div>
  );
};

export default ShowList;

