export const levelColors = {
    STARTER: 'green',
    APPRENTICE: 'blue',
    CHALLENGER: 'yellow',
    EXPERT: 'orange',
    LEGENDARY: 'red',
};

export const levelLabels = {
    STARTER: 'Starter',
    APPRENTICE: 'Apprentice',
    CHALLENGER: 'Challenger',
    EXPERT: 'Expert',
    LEGENDARY: 'Legendary',
};

export const ProblemsQueryKeys = ['problems'];

export const StatsQueryKeys = ['keys'];

export const RunTestMutationKeys = ['run'];

export const RunCustomTestMutationKeys = ['run', 'custom'];

export const SubmitProblemKeys = ['submit'];

export const UpdateProfileKeys = ['profile'];

export const UpdateProfilePicture = ['profile', 'picture'];

export const topicOptions = [
    'ARRAY',
    'STRING',
    'TWO_POINTERS',
    'SLIDING_WINDOW',
    'PREFIX_SUM',
    'BIT_MANIPULATION',
    'LINKED_LIST',
    'STACK',
    'QUEUE',
    'HASH_TABLE',
    'HEAP',
    'GRAPH',
    'BINARY_TREE',
    'BINARY_SEARCH_TREE',
    'TRIE',
    'SEGMENT_TREE',
    'FENWICK_TREE',
    'UNION_FIND',
    'DOUBLY_LINKED_LIST',
    'DEQUE',
    'RECURSION',
    'BACKTRACKING',
    'BINARY_SEARCH',
    'SORTING',
    'GREEDY',
    'DYNAMIC_PROGRAMMING',
    'NUMBER_THEORY',
    'BITWISE_OPERATIONS',
    'SUFFIX_ARRAY',
] as const;
