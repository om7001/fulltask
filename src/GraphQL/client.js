import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
const httpLink = createHttpLink({
    uri: "http://localhost:8000/graphql",
});
// uri = btask2-gql (backend)

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            'authorization': token ? token : "",
        }
    }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
            if (extensions && extensions.code) {
                console.log(
                    `[GraphQL error]: Code: ${extensions.code}, Message: ${message}`
                );
            }
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );

            if (extensions && extensions.code === "UNAUTHENTICATED") {
                localStorage.clear();
                window.location.replace("/");
            }
        });
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});


const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache()
});

export default client;