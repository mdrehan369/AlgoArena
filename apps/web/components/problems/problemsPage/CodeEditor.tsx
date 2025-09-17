'use client';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java.js';
import 'ace-builds/src-noconflict/mode-javascript.js';
import 'ace-builds/src-noconflict/mode-python.js';
import 'ace-builds/src-noconflict/mode-c_cpp.js';
import 'ace-builds/src-noconflict/theme-github_dark.js';
import 'ace-builds/src-noconflict/theme-chrome.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import 'ace-builds/src-noconflict/theme-cobalt.js';
import 'ace-builds/src-noconflict/ext-language_tools.js';

import 'ace-builds/src-noconflict/snippets/java';
import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/snippets/python';
import 'ace-builds/src-noconflict/snippets/c_cpp';

import ace from 'ace-builds/src-noconflict/ace';
import { Select, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconFile, IconRefresh, IconSettings } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@lib/hooks';
import { format } from 'actions/format';
import configureAce from 'config/ace.config';
import {
    setCode,
    setCompileError,
    setCustomTestCaseResults,
    setLanguage,
    startRunTest,
    stopCustomTest,
} from '@lib/features/problemsPage/problemPage.slice';
import { useMutation } from '@tanstack/react-query';
import { runCustomTest, runTest } from 'queries/runners.queries';
import {
    RunCustomTestMutationKeys,
    RunTestMutationKeys,
} from '@utils/constants';

// Enhanced custom theme matching Algo Arena branding
configureAce(ace);

const themes = [
    { value: 'algo-arena', label: 'Algo Arena' },
    { value: 'github_dark', label: 'GitHub Dark' },
    { value: 'chrome', label: 'Chrome Light' },
    { value: 'cobalt', label: 'Cobalt' },
    { value: 'monokai', label: 'Monokai' },
];

enum Language {
    C = 'C',
    CPP = 'CPP',
    JS = 'JS',
    PYTHON = 'PYTHON',
}

const languageMap = [
    {
        language: Language.C,
        editor_mode: 'c_cpp',
        label: 'C',
    },
    {
        language: Language.CPP,
        editor_mode: 'c_cpp',
        label: 'C++',
    },
    {
        language: Language.JS,
        editor_mode: 'javascript',
        label: 'JavaScript',
    },
    {
        language: Language.PYTHON,
        editor_mode: 'python',
        label: 'Python',
    },
];

function ProblemEditor() {
    const [selectedTheme, setSelectedTheme] = useState('algo-arena');
    const {
        code,
        isRunning,
        problem,
        language,
        isCustomTestCasesRunning,
        customTestCases,
        jobId,
    } = useAppSelector((state) => state.problemPage);
    const placeHolder =
        useAppSelector(
            (state) =>
                state.problemPage.problem?.driverCodes.find(
                    (val) => val.language == language,
                )?.placeHolderCode,
        ) || '';
    const dispatch = useAppDispatch();

    const runTestMutation = useMutation({
        mutationFn: runTest,
        mutationKey: RunTestMutationKeys,
        onSuccess: (data) => {
            console.log(data);
        },
    });

    const runCustomTestMutation = useMutation({
        mutationFn: runCustomTest,
        mutationKey: RunCustomTestMutationKeys,
        onSuccess: (data) => {
            console.log(data);
        },
    });

    useEffect(() => {
        if (isRunning) {
            runTestMutation.mutate({
                code,
                language,
                problemId: problem!.id,
                id: jobId,
            });
        }

        if (isCustomTestCasesRunning) {
            runCustomTestMutation.mutate({
                id: jobId,
                code,
                language,
                problemId: problem!.id,
                customTestCases: customTestCases.map((tc) => ({
                    ...tc,
                    problemId: problem!.id,
                })),
            });
        }
    }, [isRunning, isCustomTestCasesRunning]);

    const currentLanguageConfig = languageMap.find(
        (lang) => lang.language === language,
    );

    const formatCode = async (code: string) => {
        const formatted = await format(code.replaceAll('\\n', '\n'), language);
        dispatch(setCode(formatted));
    };

    const handleReset = async () => await formatCode(placeHolder);

    const handleFormat = async () => await formatCode(code);

    const prevPlaceholderRef = useRef<string>('');
    useEffect(() => {
        if (placeHolder && placeHolder !== prevPlaceholderRef.current) {
            prevPlaceholderRef.current = placeHolder;
            (async () => {
                await formatCode(placeHolder);
            })();
        }
    }, [placeHolder, language]);

    return (
        <div
            className="w-full h-full flex flex-col rounded-lg overflow-hidden"
            style={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
        >
            {' '}
            {/* Editor Header */}
            <div
                className="w-full h-12 flex items-center justify-between px-4"
                style={{
                    backgroundColor: '#0f172a',
                    borderBottom: '1px solid #334155',
                }}
            >
                <Group gap="md">
                    <Select
                        value={language}
                        onChange={(value) =>
                            dispatch(setLanguage(value as Language))
                        }
                        data={languageMap.map((lang) => ({
                            value: lang.language,
                            label: lang.label,
                        }))}
                        size="sm"
                        w={120}
                        styles={{
                            input: {
                                backgroundColor: 'transparent',
                                border: '1px solid #475569',
                                color: '#e2e8f0',
                                fontSize: '14px',
                            },
                            dropdown: {
                                backgroundColor: '#1e293b',
                                border: '1px solid #475569',
                            },
                            option: {
                                color: '#e2e8f0',
                                '&[dataSelected]': {
                                    backgroundColor: 'rgba(20, 184, 166, 0.2)',
                                    color: '#14b8a6',
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(20, 184, 166, 0.1)',
                                },
                            },
                        }}
                    />

                    <Select
                        value={selectedTheme}
                        onChange={(value) =>
                            setSelectedTheme(value || 'algo-arena')
                        }
                        data={themes}
                        size="sm"
                        w={140}
                        styles={{
                            input: {
                                backgroundColor: 'transparent',
                                border: '1px solid #475569',
                                color: '#e2e8f0',
                                fontSize: '14px',
                            },
                            dropdown: {
                                backgroundColor: '#1e293b',
                                border: '1px solid #475569',
                            },
                            option: {
                                color: '#e2e8f0',
                                '&[dataSelected]': {
                                    backgroundColor: 'rgba(20, 184, 166, 0.2)',
                                    color: '#14b8a6',
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(20, 184, 166, 0.1)',
                                },
                            },
                        }}
                    />
                </Group>

                <Group gap="xs">
                    <Tooltip label="Reset Code">
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            size="sm"
                            onClick={handleReset}
                        >
                            <IconRefresh size={16} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Editor Settings">
                        <ActionIcon variant="subtle" color="gray" size="sm">
                            <IconSettings size={16} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Format Code">
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            size="sm"
                            onClick={handleFormat}
                        >
                            <IconFile size={16} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </div>
            {/* Ace Editor */}
            <div className="flex-1">
                <AceEditor
                    mode={currentLanguageConfig?.editor_mode || 'c_cpp'}
                    theme={selectedTheme}
                    name="algo-arena-editor"
                    fontSize={14}
                    lineHeight={20}
                    width="100%"
                    height="100%"
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={code}
                    onChange={(val) => dispatch(setCode(val))}
                    wrapEnabled={false}
                    tabSize={4}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        useWorker: false,
                        fontFamily:
                            "'Monaco', 'Consolas', 'Courier New', monospace",
                        cursorStyle: 'smooth',
                        behavioursEnabled: true,
                        wrapBehavioursEnabled: true,
                        autoScrollEditorIntoView: true,
                        copyWithEmptySelection: false,
                        useSoftTabs: true,
                        navigateWithinSoftTabs: false,
                    }}
                    editorProps={{
                        $blockScrolling: Number.POSITIVE_INFINITY,
                    }}
                    commands={[
                        {
                            name: 'runCode',
                            bindKey: { win: "Ctrl-'", mac: "Command-'" },
                            exec: () => {
                                dispatch(startRunTest());
                            },
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default ProblemEditor;
