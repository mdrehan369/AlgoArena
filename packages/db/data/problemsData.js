"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.data = [
  {
    title: "Two Sum",
    description:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    slug: "two-sum",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists",
    ],
    topics: ["ARRAY", "HASH_TABLE"],
    level: "STARTER",
    acceptanceRate: 49.5,
    exampleTestCases: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        description: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        description: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    testCases: [
      {
        input: "[2,7,11,15]\n9",
        output: "[0,1]",
        hidden: false,
      },
      {
        input: "[3,2,4]\n6",
        output: "[1,2]",
        hidden: false,
      },
      {
        input: "[3,3]\n6",
        output: "[0,1]",
        hidden: true,
      },
      {
        input: "[-1,-2,-3,-4,-5]\n-8",
        output: "[2,4]",
        hidden: true,
      },
      {
        input: "[1,2,3,4,5,6,7,8,9,10]\n19",
        output: "[8,9]",
        hidden: true,
      },
    ],
    driverCodes: [
      {
        language: "CPP",
        beforeCode:
          "#include <vector>\n#include <iostream>\n#include <sstream>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n",
        afterCode:
          '    }\n};\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> nums;\n    line = line.substr(1, line.length() - 2);\n    stringstream ss(line);\n    string num;\n    while (getline(ss, num, \',\')) {\n        nums.push_back(stoi(num));\n    }\n    \n    int target;\n    cin >> target;\n    \n    Solution sol;\n    vector<int> result = sol.twoSum(nums, target);\n    cout << "[" << result[0] << "," << result[1] << "]" << endl;\n    return 0;\n}',
      },
      {
        language: "C",
        beforeCode:
          "#include <stdio.h>\n#include <stdlib.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n",
        afterCode:
          '}\n\nint main() {\n    int nums[10000];\n    int numsSize = 0;\n    int target;\n    \n    char c;\n    scanf("%c", &c);\n    while (scanf("%d%c", &nums[numsSize], &c)) {\n        numsSize++;\n        if (c == \']\') break;\n    }\n    scanf("%d", &target);\n    \n    int returnSize;\n    int* result = twoSum(nums, numsSize, target, &returnSize);\n    printf("[%d,%d]\\n", result[0], result[1]);\n    free(result);\n    return 0;\n}',
      },
      {
        language: "JS",
        beforeCode:
          "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nvar twoSum = function(nums, target) {\n",
        afterCode:
          "};\n\nlet input = [];\nrl.on('line', (line) => {\n    input.push(line.trim());\n    if (input.length === 2) {\n        const nums = JSON.parse(input[0]);\n        const target = parseInt(input[1]);\n        console.log(JSON.stringify(twoSum(nums, target)));\n        rl.close();\n    }\n});",
      },
      {
        language: "PYTHON",
        beforeCode:
          "from typing import List\nimport sys\nimport json\n\nclass Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n",
        afterCode:
          '\n\nif __name__ == "__main__":\n    nums = json.loads(input().strip())\n    target = int(input().strip())\n    sol = Solution()\n    result = sol.twoSum(nums, target)\n    print(json.dumps(result))',
      },
    ],
  },
  {
    title: "Valid Parentheses",
    description:
      "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    slug: "valid-parentheses",
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'.",
    ],
    topics: ["STRING", "STACK"],
    level: "STARTER",
    acceptanceRate: 40.2,
    exampleTestCases: [
      {
        input: 's = "()"',
        output: "true",
        description: "The string contains valid parentheses.",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        description: "All brackets are properly matched.",
      },
      {
        input: 's = "(]"',
        output: "false",
        description: "Brackets are not properly matched.",
      },
    ],
    testCases: [
      {
        input: "()",
        output: "true",
        hidden: false,
      },
      {
        input: "()[]{}",
        output: "true",
        hidden: false,
      },
      {
        input: "(]",
        output: "false",
        hidden: false,
      },
      {
        input: "([)]",
        output: "false",
        hidden: true,
      },
      {
        input: "{[]}",
        output: "true",
        hidden: true,
      },
      {
        input: "(((",
        output: "false",
        hidden: true,
      },
    ],
    driverCodes: [
      {
        language: "CPP",
        beforeCode:
          "#include <string>\n#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n",
        afterCode:
          '    }\n};\n\nint main() {\n    string s;\n    cin >> s;\n    Solution sol;\n    cout << (sol.isValid(s) ? "true" : "false") << endl;\n    return 0;\n}',
      },
      {
        language: "C",
        beforeCode:
          "#include <stdio.h>\n#include <stdbool.h>\n#include <string.h>\n\nbool isValid(char* s) {\n",
        afterCode:
          '}\n\nint main() {\n    char s[10001];\n    scanf("%s", s);\n    printf("%s\\n", isValid(s) ? "true" : "false");\n    return 0;\n}',
      },
      {
        language: "JS",
        beforeCode:
          "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nvar isValid = function(s) {\n",
        afterCode:
          "};\n\nrl.on('line', (line) => {\n    console.log(isValid(line.trim()));\n    rl.close();\n});",
      },
      {
        language: "PYTHON",
        beforeCode: "class Solution:\n    def isValid(self, s: str) -> bool:\n",
        afterCode:
          '\n\nif __name__ == "__main__":\n    s = input().strip()\n    sol = Solution()\n    result = sol.isValid(s)\n    print(str(result).lower())',
      },
    ],
  },
  {
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
    slug: "reverse-string",
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character.",
    ],
    topics: ["STRING", "TWO_POINTERS"],
    level: "STARTER",
    acceptanceRate: 77.8,
    exampleTestCases: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
        description: 'The string "hello" becomes "olleh".',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
        description: 'The string "Hannah" becomes "hannaH".',
      },
    ],
    testCases: [
      {
        input: '["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
        hidden: false,
      },
      {
        input: '["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
        hidden: false,
      },
      {
        input: '["a"]',
        output: '["a"]',
        hidden: true,
      },
      {
        input:
          '["A"," ","m","a","n",","," ","a"," ","p","l","a","n",","," ","a"," ","c","a","n","a","l",":"," ","P","a","n","a","m","a"]',
        output:
          '["a","m","a","n","a","P"," ",":","l","a","n","a","c"," ","a"," ",",","n","a","l","p"," ","a"," ",",","n","a","m"," ","A"]',
        hidden: true,
      },
    ],
    driverCodes: [
      {
        language: "CPP",
        beforeCode:
          "#include <vector>\n#include <iostream>\n#include <sstream>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseString(vector<char>& s) {\n",
        afterCode:
          '    }\n};\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<char> s;\n    \n    line = line.substr(1, line.length() - 2);\n    stringstream ss(line);\n    string ch;\n    while (getline(ss, ch, \',\')) {\n        ch = ch.substr(1, ch.length() - 2);\n        s.push_back(ch[0]);\n    }\n    \n    Solution sol;\n    sol.reverseString(s);\n    \n    cout << "[";\n    for (int i = 0; i < s.size(); i++) {\n        cout << "\\"" << s[i] << "\\"";\n        if (i < s.size() - 1) cout << ",";\n    }\n    cout << "]" << endl;\n    return 0;\n}',
      },
      {
        language: "C",
        beforeCode:
          "#include <stdio.h>\n\nvoid reverseString(char* s, int sSize) {\n",
        afterCode:
          '}\n\nint main() {\n    char s[100000];\n    int sSize = 0;\n    \n    // Simplified input parsing\n    printf("[]");\n    return 0;\n}',
      },
      {
        language: "JS",
        beforeCode:
          "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nvar reverseString = function(s) {\n",
        afterCode:
          "};\n\nrl.on('line', (line) => {\n    const s = JSON.parse(line.trim());\n    reverseString(s);\n    console.log(JSON.stringify(s));\n    rl.close();\n});",
      },
      {
        language: "PYTHON",
        beforeCode:
          "from typing import List\nimport json\n\nclass Solution:\n    def reverseString(self, s: List[str]) -> None:\n",
        afterCode:
          '\n\nif __name__ == "__main__":\n    s = json.loads(input().strip())\n    sol = Solution()\n    sol.reverseString(s)\n    print(json.dumps(s))',
      },
    ],
  },
  {
    title: "Maximum Subarray",
    description:
      "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\nA subarray is a contiguous part of an array.",
    slug: "maximum-subarray",
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    topics: ["ARRAY", "DYNAMIC_PROGRAMMING"],
    level: "APPRENTICE",
    acceptanceRate: 49.8,
    exampleTestCases: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        description: "The subarray [4,-1,2,1] has the largest sum = 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        description: "The subarray [1] has the largest sum = 1.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        description: "The subarray [5,4,-1,7,8] has the largest sum = 23.",
      },
    ],
    testCases: [
      {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        hidden: false,
      },
      {
        input: "[1]",
        output: "1",
        hidden: false,
      },
      {
        input: "[5,4,-1,7,8]",
        output: "23",
        hidden: false,
      },
      {
        input: "[-1]",
        output: "-1",
        hidden: true,
      },
      {
        input: "[-2,-1]",
        output: "-1",
        hidden: true,
      },
      {
        input: "[1,2,3,4,5]",
        output: "15",
        hidden: true,
      },
    ],
    driverCodes: [
      {
        language: "CPP",
        beforeCode:
          "#include <vector>\n#include <iostream>\n#include <sstream>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n",
        afterCode:
          "    }\n};\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> nums;\n    line = line.substr(1, line.length() - 2);\n    stringstream ss(line);\n    string num;\n    while (getline(ss, num, ',')) {\n        nums.push_back(stoi(num));\n    }\n    \n    Solution sol;\n    cout << sol.maxSubArray(nums) << endl;\n    return 0;\n}",
      },
      {
        language: "C",
        beforeCode:
          "#include <stdio.h>\n#include <limits.h>\n\nint maxSubArray(int* nums, int numsSize) {\n",
        afterCode:
          '}\n\nint main() {\n    int nums[100000];\n    int numsSize = 0;\n    \n    char c;\n    scanf("%c", &c);\n    while (scanf("%d%c", &nums[numsSize], &c)) {\n        numsSize++;\n        if (c == \']\') break;\n    }\n    \n    printf("%d\\n", maxSubArray(nums, numsSize));\n    return 0;\n}',
      },
      {
        language: "JS",
        beforeCode:
          "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nvar maxSubArray = function(nums) {\n",
        afterCode:
          "};\n\nrl.on('line', (line) => {\n    const nums = JSON.parse(line.trim());\n    console.log(maxSubArray(nums));\n    rl.close();\n});",
      },
      {
        language: "PYTHON",
        beforeCode:
          "from typing import List\nimport json\n\nclass Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n",
        afterCode:
          '\n\nif __name__ == "__main__":\n    nums = json.loads(input().strip())\n    sol = Solution()\n    result = sol.maxSubArray(nums)\n    print(result)',
      },
    ],
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description:
      "Given a string `s`, find the length of the longest substring without repeating characters.\n\nA substring is a contiguous non-empty sequence of characters within a string.",
    slug: "longest-substring-without-repeating-characters",
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    topics: ["STRING", "SLIDING_WINDOW", "HASH_TABLE"],
    level: "APPRENTICE",
    acceptanceRate: 33.8,
    exampleTestCases: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        description: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        description: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        description: 'The answer is "wke", with the length of 3.',
      },
    ],
    testCases: [
      {
        input: "abcabcbb",
        output: "3",
        hidden: false,
      },
      {
        input: "bbbbb",
        output: "1",
        hidden: false,
      },
      {
        input: "pwwkew",
        output: "3",
        hidden: false,
      },
      {
        input: "",
        output: "0",
        hidden: true,
      },
      {
        input: " ",
        output: "1",
        hidden: true,
      },
      {
        input: "dvdf",
        output: "3",
        hidden: true,
      },
    ],
    driverCodes: [
      {
        language: "CPP",
        beforeCode:
          "#include <string>\n#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n",
        afterCode:
          "    }\n};\n\nint main() {\n    string s;\n    getline(cin, s);\n    Solution sol;\n    cout << sol.lengthOfLongestSubstring(s) << endl;\n    return 0;\n}",
      },
      {
        language: "C",
        beforeCode:
          "#include <stdio.h>\n#include <string.h>\n\nint lengthOfLongestSubstring(char* s) {\n",
        afterCode:
          '}\n\nint main() {\n    char s[50001];\n    fgets(s, sizeof(s), stdin);\n    s[strcspn(s, "\\n")] = 0;\n    printf("%d\\n", lengthOfLongestSubstring(s));\n    return 0;\n}',
      },
      {
        language: "JS",
        beforeCode:
          "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nvar lengthOfLongestSubstring = function(s) {\n",
        afterCode:
          "};\n\nrl.on('line', (line) => {\n    console.log(lengthOfLongestSubstring(line));\n    rl.close();\n});",
      },
      {
        language: "PYTHON",
        beforeCode:
          "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n",
        afterCode:
          '\n\nif __name__ == "__main__":\n    s = input()\n    sol = Solution()\n    result = sol.lengthOfLongestSubstring(s)\n    print(result)',
      },
    ],
  },
  {
    title: "Binary Tree Inorder Traversal",
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.\n\nInorder traversal visits nodes in this order: Left, Root, Right.",
    slug: "binary-tree-inorder-traversal",
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100",
    ],
    topics: ["BINARY_TREE", "STACK", "RECURSION"],
    level: "APPRENTICE",
    acceptanceRate: 71.2,
    exampleTestCases: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]",
        description: "Inorder traversal: left, root, right",
      },
      {
        input: "root = []",
        output: "[]",
        description: "Empty tree",
      },
      {
        input: "root = [1]",
        output: "[1]",
        description: "Single node",
      },
    ],
    testCases: [
      {
        input: "[1,null,2,3]",
        output: "[1,3,2]",
        hidden: false,
      },
      {
        input: "[]",
        output: "[]",
        hidden: false,
      },
      {
        input: "[1]",
        output: "[1]",
        hidden: false,
      },
      {
        input: "[1,2,3,4,5]",
        output: "[4,2,5,1,3]",
        hidden: true,
      },
      {
        input: "[1,2,3,null,null,4,5]",
        output: "[2,1,4,3,5]",
        hidden: true,
      },
    ],
    driverCodes: [
      {
        language: "CPP",
        beforeCode:
          "#include <vector>\n#include <iostream>\n#include <sstream>\n#include <queue>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n\nclass Solution {\npublic:\n    vector<int> inorderTraversal(TreeNode* root) {\n",
        afterCode:
          '    }\n};\n\nint main() {\n    string line;\n    getline(cin, line);\n    \n    Solution sol;\n    vector<int> result = sol.inorderTraversal(nullptr);\n    cout << "[";\n    for (int i = 0; i < result.size(); i++) {\n        cout << result[i];\n        if (i < result.size() - 1) cout << ",";\n    }\n    cout << "]" << endl;\n    return 0;\n}',
      },
      {
        language: "C",
        beforeCode:
          "#include <stdio.h>\n#include <stdlib.h>\n\nstruct TreeNode {\n    int val;\n    struct TreeNode *left;\n    struct TreeNode *right;\n};\n\nint* inorderTraversal(struct TreeNode* root, int* returnSize) {\n",
        afterCode:
          '}\n\nint main() {\n    int returnSize;\n    int* result = inorderTraversal(NULL, &returnSize);\n    \n    printf("[");\n    for (int i = 0; i < returnSize; i++) {\n        printf("%d", result[i]);\n        if (i < returnSize - 1) printf(",");\n    }\n    printf("]\\n");\n    \n    if (result) free(result);\n    return 0;\n}',
      },
      {
        language: "JS",
        beforeCode:
          "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nfunction TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val)\n    this.left = (left===undefined ? null : left)\n    this.right = (right===undefined ? null : right)\n}\n\nvar inorderTraversal = function(root) {\n",
        afterCode:
          "};\n\nrl.on('line', (line) => {\n    const vals = JSON.parse(line.trim());\n    console.log(JSON.stringify(inorderTraversal(null)));\n    rl.close();\n});",
      },
      {
        language: "PYTHON",
        beforeCode:
          "from typing import List, Optional\nimport json\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nclass Solution:\n    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:\n",
        afterCode:
          '\n\nif __name__ == "__main__":\n    vals = json.loads(input().strip())\n    sol = Solution()\n    result = sol.inorderTraversal(None)\n    print(json.dumps(result))',
      },
    ],
  },
];
console.log(exports.data.length);
