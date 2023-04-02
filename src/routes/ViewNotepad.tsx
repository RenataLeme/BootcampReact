import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../api";
import ButtonDelete from "../components/ButtonDelete";
import toast from "react-simple-toasts";
import { Breadcrumbs } from "../components/BreadCrumbs";

export function ViewNotepad() {
  const params = useParams();
  const navigate = useNavigate();
  const [notepad, setNotepad] = useState({
    id: params.id,
    title: "",
    subtitle: "",
    content: "",
    created_at: "",
  });

  useEffect(() => {
    api.get(`/notepads/${params.id}`).then((res) => {
      const notepad = res.data;
      setNotepad(notepad);
    });
  }, []);

  return (
    <div className="flex flex-col w-[400px] h-[300px] shadow-2xl  px-9 py-4 bg-[#68767d] rounded-md mt-[60px] mb-18 mx-12 max-w-screen-md md:w-[1000px] md:mx-20 md:m-4 text-start">
      <span className="pb-0 text-gray-700">{notepad.id}</span>
      <time
        className="font-bold pb-4 text-gray-700"
        dateTime={notepad.created_at}
      >
        {new Date(notepad.created_at).toLocaleDateString()}
      </time>
      <h1 className="font-bold text-2xl">{notepad.title}</h1>
      <p className="text-lg ">{notepad.subtitle}</p>
      <span className="text-base pt-4">{notepad.content}</span>

      <div className="mt-20 px-40 md:px-[530px]">
        <Breadcrumbs links={["/", "/publicacoes/${params.id}"]} />
        <ButtonDelete
          onClick={async () => {
            const res = await api.delete(`/notepads/${params.id}`);
            const deleteNotepadResponse = res.data;

            if (deleteNotepadResponse.success) {
              toast("Item deletado com sucesso");
              navigate("/");
            } else {
              toast("Erro ao deletar o ítem");
            }
          }}
        >
          Deletar
        </ButtonDelete>
      </div>
    </div>
  );
}
