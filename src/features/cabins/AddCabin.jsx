import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="form">
          <Button variation="primary" size="medium">
            ++ Create new cabin
          </Button>
        </Modal.Open>
        <Modal.Window name="form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );

  // const [isShowModal, setIsShowModal] = useState(false);
  // const handleClick = () => {
  //   setIsShowModal((prev) => !prev);
  // };
  // return (
  //   <div>
  //     <Button variation="primary" size="medium" onClick={handleClick}>
  //       ++ Create new cabin
  //     </Button>
  //     {isShowModal && (
  //       <Modal oncloseModal={() => setIsShowModal(false)}>
  //         <CreateCabinForm oncloseModal={() => setIsShowModal(false)} />
  //       </Modal>
  //     )}
  //   </div>
  // );
}

export default AddCabin;
