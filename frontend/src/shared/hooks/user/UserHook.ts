import { useMutation, useQuery, useQueryClient  } from "@tanstack/react-query";
import { findAllUsers, deleteUser } from "../../services/api/user/UserService";
import { ListOfUser, GenericError } from "../../types/types";

// Hook para deletar um usuário
const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, GenericError, string>({
      mutationFn: async (userId) => {
          const result = await deleteUser(userId);

          // Se `result` for um erro (GenericError), lança-o
          if (result && "statusCode" in result) {
              throw result;
          }

          // Caso contrário, o resultado é `void`, e a execução continua normalmente
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: (error) => {
          console.error(`Error (${error.statusCode}): ${error.message}`);
      },
  });
};

// Hook para buscar todos os "
const useAllUsers = () => {
  return useQuery<ListOfUser, GenericError>({
      queryKey: ["users"], // Chave única para cache
      queryFn: async () => {
          const result = await findAllUsers();

          // Lida com o possível retorno de erro do serviço
          if ("statusCode" in result) {
              throw result; // O React Query trata o erro lançado
          }

          return result; // Retorna a lista de " em caso de sucesso
      },
      initialData: [],
  });
};
export  { useDeleteUser, useAllUsers }
