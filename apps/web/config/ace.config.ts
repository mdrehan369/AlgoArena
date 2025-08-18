import type ace from "ace-builds/src-noconflict/ace"

export default function configureAce(aceInstance: typeof ace) {
  aceInstance.define(
    "ace/theme/algo-arena",
    ["require", "exports", "module", "ace/lib/dom"],
    (require: any, exports: any, module: any) => {
      exports.isDark = true
      exports.cssClass = "ace-algo-arena"
      exports.cssText = `
    /* Main editor background - matches our app background */
    .ace-algo-arena {
      background-color: #1e293b;
      color: #e2e8f0;
      font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
    }
    
    /* Gutter (line numbers area) */
    .ace-algo-arena .ace_gutter {
      background: #0f172a;
      color: #64748b;
      border-right: 1px solid #334155;
    }
    
    /* Active line number */
    .ace-algo-arena .ace_gutter-active-line {
      background-color: rgba(20, 184, 166, 0.1);
      color: #14b8a6;
    }
    
    /* Print margin line */
    .ace-algo-arena .ace_print-margin {
      width: 1px;
      background: #475569;
    }
    
    /* Cursor */
    .ace-algo-arena .ace_cursor {
      color: #14b8a6;
      border-left: 2px solid #14b8a6;
    }
    
    /* Text selection */
    .ace-algo-arena .ace_marker-layer .ace_selection {
      background: rgba(20, 184, 166, 0.2);
      border-radius: 2px;
    }
    
    /* Active line highlight */
    .ace-algo-arena .ace_marker-layer .ace_active-line {
      background: rgba(20, 184, 166, 0.05);
    }
    
    /* ===== C/C++ SPECIFIC SYNTAX HIGHLIGHTING ===== */
    
    /* Keywords (if, for, while, class, struct, etc.) */
    .ace-algo-arena .ace_keyword {
      color: #c084fc;
      font-weight: 600;
    }
    
    /* Control flow keywords (return, break, continue, goto) */
    .ace-algo-arena .ace_keyword.ace_control {
      color: #f472b6;
      font-weight: 600;
    }
    
    /* Storage keywords (int, char, float, double, void, etc.) */
    .ace-algo-arena .ace_storage.ace_type {
      color: #60a5fa;
      font-weight: 600;
    }
    
    /* Storage modifiers (static, const, volatile, extern, etc.) */
    .ace-algo-arena .ace_storage.ace_modifier {
      color: #a78bfa;
      font-weight: 500;
    }
    
    /* Preprocessor directives (#include, #define, #ifdef, etc.) */
    .ace-algo-arena .ace_support.ace_other {
      color: #fbbf24;
      font-weight: 600;
    }
    
    /* Header files and includes */
    .ace-algo-arena .ace_string.ace_other {
      color: #34d399;
    }
    
    /* Standard library functions and types */
    .ace-algo-arena .ace_support.ace_function {
      color: #14b8a6;
      font-weight: 500;
    }
    
    /* Built-in types and classes */
    .ace-algo-arena .ace_support.ace_type,
    .ace-algo-arena .ace_support.ace_class {
      color: #60a5fa;
      font-weight: 600;
    }
    
    /* Constants and defines */
    .ace-algo-arena .ace_support.ace_constant {
      color: #fb7185;
      font-weight: 500;
    }
    
    /* Strings */
    .ace-algo-arena .ace_string {
      color: #34d399;
    }
    
    /* Character literals */
    .ace-algo-arena .ace_string.ace_char {
      color: #4ade80;
    }
    
    /* Comments */
    .ace-algo-arena .ace_comment {
      color: #64748b;
      font-style: italic;
    }
    
    /* Multi-line comments */
    .ace-algo-arena .ace_comment.ace_doc {
      color: #6b7280;
      font-style: italic;
    }
    
    /* Numbers (integers, floats, hex, etc.) */
    .ace-algo-arena .ace_constant.ace_numeric {
      color: #fbbf24;
      font-weight: 500;
    }
    
    /* Hexadecimal numbers */
    .ace-algo-arena .ace_constant.ace_numeric.ace_hex {
      color: #f59e0b;
    }
    
    /* Variables and identifiers */
    .ace-algo-arena .ace_variable {
      color: #e2e8f0;
    }
    
    /* Function names */
    .ace-algo-arena .ace_entity.ace_name.ace_function {
      color: #14b8a6;
      font-weight: 600;
    }
    
    /* Class and struct names */
    .ace-algo-arena .ace_entity.ace_name.ace_type {
      color: #60a5fa;
      font-weight: 600;
    }
    
    /* Namespace names */
    .ace-algo-arena .ace_entity.ace_name.ace_namespace {
      color: #a78bfa;
    }
    
    /* Operators (+, -, *, /, =, ==, !=, etc.) */
    .ace-algo-arena .ace_keyword.ace_operator {
      color: #f8fafc;
      font-weight: 500;
    }
    
    /* Logical operators (&&, ||, !) */
    .ace-algo-arena .ace_keyword.ace_operator.ace_logical {
      color: #fb7185;
      font-weight: 600;
    }
    
    /* Brackets, parentheses, and braces */
    .ace-algo-arena .ace_paren {
      color: #cbd5e1;
      font-weight: 500;
    }
    
    /* Semicolons and commas */
    .ace-algo-arena .ace_punctuation {
      color: #94a3b8;
    }
    
    /* Template parameters */
    .ace-algo-arena .ace_meta.ace_template {
      color: #c084fc;
    }
    
    /* Pointers and references */
    .ace-algo-arena .ace_keyword.ace_operator.ace_pointer {
      color: #fb7185;
      font-weight: 600;
    }
    
    /* Scope resolution operator (::) */
    .ace-algo-arena .ace_keyword.ace_operator.ace_scope {
      color: #a78bfa;
      font-weight: 600;
    }
    
    /* Member access operators (., ->) */
    .ace-algo-arena .ace_keyword.ace_operator.ace_member {
      color: #14b8a6;
    }
    
    /* Boolean literals (true, false) */
    .ace-algo-arena .ace_constant.ace_language.ace_boolean {
      color: #fb7185;
      font-weight: 600;
    }
    
    /* NULL, nullptr */
    .ace-algo-arena .ace_constant.ace_language.ace_null {
      color: #ef4444;
      font-weight: 600;
    }
    
    /* this keyword */
    .ace-algo-arena .ace_variable.ace_language.ace_this {
      color: #c084fc;
      font-weight: 600;
    }
    
    /* Labels for goto statements */
    .ace-algo-arena .ace_entity.ace_name.ace_label {
      color: #fbbf24;
      font-weight: 500;
    }
    
    /* Macros and defines */
    .ace-algo-arena .ace_entity.ace_name.ace_preprocessor {
      color: #fbbf24;
      font-weight: 600;
    }
    
    /* Error highlighting */
    .ace-algo-arena .ace_marker-layer .ace_error {
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid #ef4444;
      border-radius: 2px;
    }
    
    /* Warning highlighting */
    .ace-algo-arena .ace_marker-layer .ace_warning {
      background: rgba(245, 158, 11, 0.2);
      border: 1px solid #f59e0b;
      border-radius: 2px;
    }
    
    /* Autocomplete dropdown */
    .ace_editor.ace-algo-arena .ace_autocomplete {
      background: #1e293b;
      border: 1px solid #475569;
      border-radius: 6px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    }
    
    .ace_editor.ace-algo-arena .ace_autocomplete .ace_completion-highlight {
      color: #14b8a6;
      font-weight: 600;
    }
    
    .ace_editor.ace-algo-arena .ace_autocomplete .ace_line {
      color: #e2e8f0;
    }
    
    .ace_editor.ace-algo-arena .ace_autocomplete .ace_line.ace_selected {
      background: rgba(20, 184, 166, 0.2);
    }
    
    /* Scrollbars */
    .ace-algo-arena .ace_scrollbar::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    .ace-algo-arena .ace_scrollbar::-webkit-scrollbar-track {
      background: #0f172a;
    }
    
    .ace-algo-arena .ace_scrollbar::-webkit-scrollbar-thumb {
      background: #475569;
      border-radius: 4px;
    }
    
    .ace-algo-arena .ace_scrollbar::-webkit-scrollbar-thumb:hover {
      background: #64748b;
    }
    
    /* Matching brackets */
    .ace-algo-arena .ace_marker-layer .ace_bracket {
      background: rgba(20, 184, 166, 0.3);
      border: 1px solid #14b8a6;
      border-radius: 2px;
    }
    
    /* Search highlight */
    .ace-algo-arena .ace_marker-layer .ace_selected-word {
      background: rgba(59, 130, 246, 0.3);
      border: 1px solid #3b82f6;
      border-radius: 2px;
    }
    
    /* Fold markers */
    .ace-algo-arena .ace_fold {
      background: #475569;
      border: 1px solid #64748b;
      color: #e2e8f0;
    }
    
    /* Indent guides */
    .ace-algo-arena .ace_indent-guide {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHB3d/8PAAOIAdULw8qMAAAAAElFTkSuQmCC") right repeat-y;
      opacity: 0.3;
    }
  `

      var dom = require("ace/lib/dom")
      dom.importCssString(exports.cssText, exports.cssClass)
    },
  )
}
