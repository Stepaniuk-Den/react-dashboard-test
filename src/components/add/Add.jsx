import "./add.scss";
import PropTypes from "prop-types";

const Add = ({ slug, setOpen, columns }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    //add new data
    //axios.post(`/api/${slug}s, {})
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.headerName}>
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} />
              </div>
            ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

Add.propTypes = {
  slug: PropTypes.string,
  setOpen: PropTypes.func,
  columns: PropTypes.array,
};

export default Add;
