/** 
 * Kendo UI v2022.1.119 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2022 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
! function(e) {
    "function" == typeof define && define.amd ? define(["kendo.core.min"], e) : e()
}(function() {
    ! function(e, t) {
        kendo.ui.ColorGradient && (kendo.ui.ColorGradient.prototype.options.messages = e.extend(!0, kendo.ui.ColorGradient.prototype.options.messages, {
            contrastRatio: "Contrast ratio:",
            fail: "Fail",
            pass: "Pass",
            hex: "HEX",
            toggleFormat: "Toggle format",
            red: "Red",
            green: "Green",
            blue: "Blue",
            alpha: "Alpha"
        })), kendo.ui.FlatColorPicker && (kendo.ui.FlatColorPicker.prototype.options.messages = e.extend(!0, kendo.ui.FlatColorPicker.prototype.options.messages, {
            apply: "Apply",
            cancel: "Cancel",
            noColor: "no color",
            clearColor: "Clear color"
        })), kendo.ui.ColorPicker && (kendo.ui.ColorPicker.prototype.options.messages = e.extend(!0, kendo.ui.ColorPicker.prototype.options.messages, {
            apply: "Apply",
            cancel: "Cancel",
            noColor: "no color",
            clearColor: "Clear color"
        })), kendo.ui.ColumnMenu && (kendo.ui.ColumnMenu.prototype.options.messages = e.extend(!0, kendo.ui.ColumnMenu.prototype.options.messages, {
            sortAscending: "오름차순",
            sortDescending: "내림차순",
            filter: "필터",
            column: "Column",
            columns: "항목 숨기기",
            columnVisibility: "Column Visibility",
            clear: "지우기",
            cancel: "취소",
            done: "Done",
            settings: "Edit Column Settings",
            lock: "잠금",
            unlock: "잠금해제",
            stick: "Stick Column",
            unstick: "Unstick Column",
            setColumnPosition: "틀(열) 고정",
            apply: "Apply",
            reset: "Reset",
            buttonTitle: "{0} edit column settings"
        })), kendo.ui.DateRangePicker && (kendo.ui.DateRangePicker.prototype.options.messages = e.extend(!0, kendo.ui.DateRangePicker.prototype.options.messages, {
            startLabel: "Start",
            endLabel: "End"
        })), kendo.ui.Editor && (kendo.ui.Editor.prototype.options.messages = e.extend(!0, kendo.ui.Editor.prototype.options.messages, {
            bold: "굵게",
            italic: "기울임꼴",
            underline: "밑줄",
            strikethrough: "취소선",
            superscript: "윗첨자",
            subscript: "아래첨자",
            justifyCenter: "가운데맞춤",
            justifyLeft: "왼쪽맞춤",
            justifyRight: "오른쪽맞춤",
            justifyFull: "양쪽맞춤",
            insertUnorderedList: "글머리 기호",
            insertOrderedList: "번호 매기기",
            indent: "들여쓰기",
            outdent: "내어쓰기",
            createLink: "링크 삽입",
            unlink: "링크 해제",
            insertImage: "이미지 삽입",
            insertFile: "파일 삽입",
            insertHtml: "Insert HTML",
            viewHtml: "View HTML",
            fontName: "글꼴 선택",
            fontNameInherit: "글꼴",
            fontSize: "폰트크기 선택",
            fontSizeInherit: "폰트크기",
            formatBlock: "Format",
            formatting: "Format",
            foreColor: "글꼴 색",
            backColor: "채우기 색",
            style: "Styles",
            emptyFolder: "Empty Folder",
            uploadFile: "Upload",
            overflowAnchor: "More tools",
            orderBy: "Arrange by:",
            orderBySize: "Size",
            orderByName: "Name",
            invalidFileType: 'The selected file "{0}" is not valid. Supported file types are {1}.',
            deleteFile: 'Are you sure you want to delete "{0}"?',
            overwriteFile: 'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?',
            directoryNotFound: "A directory with this name was not found.",
            imageWebAddress: "이미지 경로",
            imageAltText: "Alt 태그",
            imageWidth: "Width (px)",
            imageHeight: "Height (px)",
            fileWebAddress: "파일 경로",
            fileTitle: "타이틀",
            linkWebAddress: "링크 주소",
            linkText: "텍스트",
            linkToolTip: "툴팁",
            linkOpenInNewWindow: "새창으로 열기",
            dialogUpdate: "Update",
            dialogInsert: "적용",
            dialogButtonSeparator: "or",
            dialogCancel: "취소",
            cleanFormatting: "서식 지우기",
            createTable: "표 삽입",
            addColumnLeft: "셀 왼쪽 삽입",
            addColumnRight: "셀 오른쪽 삽입",
            addRowAbove: "셀 위로 삽입",
            addRowBelow: "셀 아래로 삽입",
            deleteRow: "행 삭제",
            deleteColumn: "열 삭제",
            dialogOk: "Ok",
            tableWizard: "Table Wizard",
            tableTab: "Table",
            cellTab: "Cell",
            accessibilityTab: "Accessibility",
            caption: "Caption",
            summary: "Summary",
            width: "Width",
            height: "Height",
            units: "Units",
            cellSpacing: "Cell Spacing",
            cellPadding: "Cell Padding",
            cellMargin: "Cell Margin",
            alignment: "Alignment",
            background: "Background",
            cssClass: "CSS Class",
            id: "ID",
            border: "Border",
            borderStyle: "Border Style",
            collapseBorders: "Collapse borders",
            wrapText: "Wrap text",
            associateCellsWithHeaders: "Associate headers",
            alignLeft: "Align Left",
            alignCenter: "Align Center",
            alignRight: "Align Right",
            alignLeftTop: "Align Left Top",
            alignCenterTop: "Align Center Top",
            alignRightTop: "Align Right Top",
            alignLeftMiddle: "Align Left Middle",
            alignCenterMiddle: "Align Center Middle",
            alignRightMiddle: "Align Right Middle",
            alignLeftBottom: "Align Left Bottom",
            alignCenterBottom: "Align Center Bottom",
            alignRightBottom: "Align Right Bottom",
            alignRemove: "Remove Alignment",
            columns: "Columns",
            rows: "Rows",
            selectAllCells: "Select All Cells",
            print: "Print",
            headerRows: "Header Rows",
            headerColumns: "Header Columns",
            tableSummaryPlaceholder: "Summary attribute is not HTML5 compatible.",
            associateNone: "None",
            associateScope: "Associate using 'scope' attribute",
            associateIds: "Associate using Ids",
            copyFormat: "Copy format",
            applyFormat: "Apply format",
            borderNone: "None",
            undo: "Undo",
            redo: "Redo"
        })), kendo.ui.FileBrowser && (kendo.ui.FileBrowser.prototype.options.messages = e.extend(!0, kendo.ui.FileBrowser.prototype.options.messages, {
            uploadFile: "Upload",
            orderBy: "Arrange by",
            orderByName: "Name",
            orderBySize: "Size",
            directoryNotFound: "A directory with this name was not found.",
            emptyFolder: "Empty Folder",
            deleteFile: 'Are you sure you want to delete "{0}"?',
            invalidFileType: 'The selected file "{0}" is not valid. Supported file types are {1}.',
            overwriteFile: 'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?',
            dropFilesHere: "drop file here to upload",
            search: "Search"
        })), kendo.ui.FileManager && (kendo.ui.FileManager.prototype.options.messages = e.extend(!0, kendo.ui.FileManager.prototype.options.messages, {
            toolbar: {
                createFolder: "New Folder",
                upload: "Upload",
                sortDirection: "Sort Direction",
                sortDirectionAsc: "Sort Direction Ascending",
                sortDirectionDesc: "Sort Direction Descending",
                sortField: "Sort By",
                nameField: "Name",
                sizeField: "File Size",
                typeField: "Type",
                dateModifiedField: "Date Modified",
                dateCreatedField: "Date Created",
                listView: "List View",
                gridView: "Grid View",
                search: "Search",
                details: "View Details",
                detailsChecked: "On",
                detailsUnchecked: "Off",
                "delete": "Delete",
                rename: "Rename"
            },
            views: {
                nameField: "Name",
                sizeField: "File Size",
                typeField: "Type",
                dateModifiedField: "Date Modified",
                dateCreatedField: "Date Created",
                items: "items",
                listLabel: "FileManager ListView",
                gridLabel: "FileManager Grid",
                treeLabel: "FileManager TreeView"
            },
            dialogs: {
                upload: {
                    title: "Upload Files",
                    clear: "Clear List",
                    done: "Done"
                },
                moveConfirm: {
                    title: "Confirm",
                    content: "<p style='text-align: center;'>Do you want to move or copy?</p>",
                    okText: "Copy",
                    cancel: "Move",
                    close: "close"
                },
                deleteConfirm: {
                    title: "Confirm",
                    content: "<p style='text-align: center;'>Are you sure you want to delete the selected file(s)?</br>You cannot undo this action.</p>",
                    okText: "Delete",
                    cancel: "Cancel",
                    close: "close"
                },
                renamePrompt: {
                    title: "Prompt",
                    content: "<p style='text-align: center;'>Enter new name for the file.</p>",
                    okText: "Rename",
                    cancel: "Cancel",
                    close: "close"
                }
            },
            previewPane: {
                noFileSelected: "No File Selected",
                extension: "Type",
                size: "Size",
                created: "Date Created",
                createdUtc: "Date Created UTC",
                modified: "Date Modified",
                modifiedUtc: "Date Modified UTC",
                items: "items"
            }
        })), kendo.ui.FilterCell && (kendo.ui.FilterCell.prototype.options.messages = e.extend(!0, kendo.ui.FilterCell.prototype.options.messages, {
            isTrue: "is true",
            isFalse: "is false",
            filter: "Filter",
            clear: "Clear",
            operator: "Operator"
        })), kendo.ui.FilterCell && (kendo.ui.FilterCell.prototype.options.operators = e.extend(!0, kendo.ui.FilterCell.prototype.options.operators, {
            string: {
                eq: "Is equal to",
                neq: "Is not equal to",
                startswith: "Starts with",
                contains: "Contains",
                doesnotcontain: "Does not contain",
                endswith: "Ends with",
                isnull: "Is null",
                isnotnull: "Is not null",
                isempty: "Is empty",
                isnotempty: "Is not empty",
                isnullorempty: "Has no value",
                isnotnullorempty: "Has value"
            },
            number: {
                eq: "Is equal to",
                neq: "Is not equal to",
                gte: "Is greater than or equal to",
                gt: "Is greater than",
                lte: "Is less than or equal to",
                lt: "Is less than",
                isnull: "Is null",
                isnotnull: "Is not null"
            },
            date: {
                eq: "Is equal to",
                neq: "Is not equal to",
                gte: "Is after or equal to",
                gt: "Is after",
                lte: "Is before or equal to",
                lt: "Is before",
                isnull: "Is null",
                isnotnull: "Is not null"
            },
            enums: {
                eq: "Is equal to",
                neq: "Is not equal to",
                isnull: "Is null",
                isnotnull: "Is not null"
            }
        })), kendo.ui.FilterMenu && (kendo.ui.FilterMenu.prototype.options.messages = e.extend(!0, kendo.ui.FilterMenu.prototype.options.messages, {
            info: "Show items with value that:",
            title: "Show items with value that",
            isTrue: "is true",
            isFalse: "is false",
            filter: "Filter",
            clear: "Clear",
            and: "And",
            or: "Or",
            selectValue: "-Select value-",
            operator: "Operator",
            value: "Value",
            cancel: "Cancel",
            done: "Done",
            into: "in",
            buttonTitle: "{0} filter column settings"
        })), kendo.ui.FilterMenu && (kendo.ui.FilterMenu.prototype.options.operators = e.extend(!0, kendo.ui.FilterMenu.prototype.options.operators, {
            string: {
                eq: "Is equal to",
                neq: "Is not equal to",
                startswith: "Starts with",
                contains: "Contains",
                doesnotcontain: "Does not contain",
                endswith: "Ends with",
                isnull: "Is null",
                isnotnull: "Is not null",
                isempty: "Is empty",
                isnotempty: "Is not empty",
                isnullorempty: "Has no value",
                isnotnullorempty: "Has value"
            },
            number: {
                eq: "Is equal to",
                neq: "Is not equal to",
                gte: "Is greater than or equal to",
                gt: "Is greater than",
                lte: "Is less than or equal to",
                lt: "Is less than",
                isnull: "Is null",
                isnotnull: "Is not null"
            },
            date: {
                eq: "Is equal to",
                neq: "Is not equal to",
                gte: "Is after or equal to",
                gt: "Is after",
                lte: "Is before or equal to",
                lt: "Is before",
                isnull: "Is null",
                isnotnull: "Is not null"
            },
            enums: {
                eq: "Is equal to",
                neq: "Is not equal to",
                isnull: "Is null",
                isnotnull: "Is not null"
            }
        })), kendo.ui.FilterMultiCheck && (kendo.ui.FilterMultiCheck.prototype.options.messages = e.extend(!0, kendo.ui.FilterMultiCheck.prototype.options.messages, {
            checkAll: "전체 선택",
            clearAll: "전체 취소",
            clear: "지우기",
            filter: "조회",
            search: "입력하세요.",
            cancel: "취소",
            selectedItemsFormat: "{0} 개 선택",
            done: "Done",
            into: "in"
        })), kendo.ui.Gantt && (kendo.ui.Gantt.prototype.options.messages = e.extend(!0, kendo.ui.Gantt.prototype.options.messages, {
            actions: {
                addChild: "Add Child",
                append: "Add Task",
                insertAfter: "Add Below",
                insertBefore: "Add Above",
                pdf: "Export to PDF"
            },
            cancel: "Cancel",
            deleteDependencyWindowTitle: "Delete dependency",
            deleteTaskWindowTitle: "Delete task",
            destroy: "Delete",
            editor: {
                assingButton: "Assign",
                editorTitle: "Task",
                end: "End",
                percentComplete: "Complete",
                plannedStart: "Planned Start",
                plannedEnd: "Planned End",
                resources: "Resources",
                resourcesEditorTitle: "Resources",
                resourcesHeader: "Resources",
                start: "Start",
                title: "Title",
                unitsHeader: "Units"
            },
            plannedTasks: {
                switchText: "Planned Tasks",
                offsetTooltipAdvanced: "Met deadline earlier",
                offsetTooltipDelay: "Delay",
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days"
            },
            save: "Save",
            views: {
                day: "Day",
                end: "End",
                month: "Month",
                start: "Start",
                week: "Week",
                year: "Year"
            }
        })), kendo.ui.Grid && (kendo.ui.Grid.prototype.options.messages = e.extend(!0, kendo.ui.Grid.prototype.options.messages, {
            commands: {
                cancel: "Cancel changes",
                canceledit: "Cancel",
                create: "Add new record",
                destroy: "Delete",
                edit: "Edit",
                excel: "Export to Excel",
                pdf: "Export to PDF",
                save: "Save changes",
                select: "Select",
                update: "Update"
            },
            editable: {
                cancelDelete: "Cancel",
                confirmation: "Are you sure you want to delete this record?",
                confirmDelete: "Delete"
            },
            noRecords: "No records available.",
            search: "Search...",
            expandCollapseColumnHeader: "",
            groupHeader: "Press ctrl + space to group",
            ungroupHeader: "Press ctrl + space to ungroup"
        })), kendo.ui.TaskBoard && (kendo.ui.TaskBoard.prototype.options.messages = e.extend(!0, kendo.ui.TaskBoard.prototype.options.messages, {
            edit: "Edit",
            createNewCard: "Create new card",
            create: "Create",
            search: "Search",
            previewCard: "Preview card",
            addCard: "Add card",
            editCard: "Edit card",
            deleteCard: "Delete Card",
            addColumn: "Add column",
            editColumn: "Edit column",
            deleteColumn: "Delete column",
            close: "Close",
            cancel: "Cancel",
            "delete": "Delete",
            saveChanges: "Save changes",
            title: "Title:",
            description: "Description:",
            newColumn: "New column",
            deleteColumnConfirm: "Are you sure you want to delete this column?",
            deleteCardConfirm: "Are you sure you want to delete this card?"
        })), kendo.ui.TreeList && (kendo.ui.TreeList.prototype.options.messages = e.extend(!0, kendo.ui.TreeList.prototype.options.messages, {
            noRows: "해당 목록이 없습니다.",
            loading: "Loading...",
            requestFailed: "Request failed.",
            retry: "Retry",
            commands: {
                edit: "Edit",
                update: "Update",
                canceledit: "Cancel",
                create: "Add new record",
                createchild: "Add child record",
                destroy: "Delete",
                excel: "Export to Excel",
                pdf: "Export to PDF"
            }
        })), kendo.ui.Groupable && (kendo.ui.Groupable.prototype.options.messages = e.extend(!0, kendo.ui.Groupable.prototype.options.messages, {
            empty: "Drag a column header and drop it here to group by that column"
        })), kendo.ui.NumericTextBox && (kendo.ui.NumericTextBox.prototype.options = e.extend(!0, kendo.ui.NumericTextBox.prototype.options, {
            upArrowText: "Increase value",
            downArrowText: "Decrease value"
        })), kendo.ui.MediaPlayer && (kendo.ui.MediaPlayer.prototype.options.messages = e.extend(!0, kendo.ui.MediaPlayer.prototype.options.messages, {
            pause: "Pause",
            play: "Play",
            mute: "Mute",
            unmute: "Unmute",
            quality: "Quality",
            fullscreen: "Full Screen",
            volume: "volume",
            time: "time"
        })), kendo.ui.Pager && (kendo.ui.Pager.prototype.options.messages = e.extend(!0, kendo.ui.Pager.prototype.options.messages, {
            allPages: "전체",
            display: "{0} - {1}   / 총  {2} 개",
            empty: "총  0 개",
            page: "Page",
            pageButtonLabel: "Page {0}",
            pageSizeDropDownLabel: "Page sizes drop down",
            of: "/ {0}",
            itemsPerPage: "개 목록",
            first: "맨처음 페이지",
            previous: "이전 페이지",
            next: "다음 페이지",
            last: "맨마지막 페이지",
            refresh: "새로고침",
            morePages: "더보기"
        })), kendo.ui.TreeListPager && (kendo.ui.TreeListPager.prototype.options.messages = e.extend(!0, kendo.ui.TreeListPager.prototype.options.messages, {
            allPages: "All",
            display: "{0} - {1} of {2} items",
            empty: "No items to display",
            page: "Page",
            of: "of {0}",
            itemsPerPage: "items per page",
            first: "Go to the first page",
            previous: "Go to the previous page",
            next: "Go to the next page",
            last: "Go to the last page",
            refresh: "Refresh",
            morePages: "더보기"
        })), kendo.ui.PivotGrid && (kendo.ui.PivotGrid.prototype.options.messages = e.extend(!0, kendo.ui.PivotGrid.prototype.options.messages, {
            measureFields: "Drop Data Fields Here",
            columnFields: "Drop Column Fields Here",
            rowFields: "Drop Rows Fields Here"
        })), kendo.ui.PivotFieldMenu && (kendo.ui.PivotFieldMenu.prototype.options.messages = e.extend(!0, kendo.ui.PivotFieldMenu.prototype.options.messages, {
            info: "Show items with value that:",
            filterFields: "Fields Filter",
            filter: "Filter",
            include: "Include Fields...",
            title: "Fields to include",
            clear: "Clear",
            ok: "Ok",
            cancel: "Cancel",
            operators: {
                contains: "Contains",
                doesnotcontain: "Does not contain",
                startswith: "Starts with",
                endswith: "Ends with",
                eq: "Is equal to",
                neq: "Is not equal to"
            }
        })), kendo.ui.RecurrenceEditor && (kendo.ui.RecurrenceEditor.prototype.options.messages = e.extend(!0, kendo.ui.RecurrenceEditor.prototype.options.messages, {
            repeat: "Repeat",
            recurrenceEditorTitle: "Recurrence editor",
            frequencies: {
                never: "Never",
                hourly: "Hourly",
                daily: "Daily",
                weekly: "Weekly",
                monthly: "Monthly",
                yearly: "Yearly"
            },
            hourly: {
                repeatEvery: "Repeat every: ",
                interval: " hour(s)"
            },
            daily: {
                repeatEvery: "Repeat every: ",
                interval: " day(s)"
            },
            weekly: {
                interval: " week(s)",
                repeatEvery: "Repeat every: ",
                repeatOn: "Repeat on: "
            },
            monthly: {
                repeatEvery: "Repeat every: ",
                repeatOn: "Repeat on: ",
                interval: " month(s)",
                day: "Day ",
                date: "Date"
            },
            yearly: {
                repeatEvery: "Repeat every: ",
                repeatOn: "Repeat on: ",
                interval: " year(s)",
                of: " of ",
                month: "month",
                day: "day",
                date: "Date"
            },
            end: {
                label: "End:",
                mobileLabel: "Ends",
                never: "Never",
                after: "After ",
                occurrence: " occurrence(s)",
                on: "On "
            },
            offsetPositions: {
                first: "first",
                second: "second",
                third: "third",
                fourth: "fourth",
                last: "last"
            },
            weekdays: {
                day: "day",
                weekday: "weekday",
                weekend: "weekend day"
            }
        })), kendo.ui.MobileRecurrenceEditor && (kendo.ui.MobileRecurrenceEditor.prototype.options.messages = e.extend(!0, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, kendo.ui.RecurrenceEditor.prototype.options.messages, {
            cancel: "Cancel",
            update: "Save",
            endTitle: "Repeat ends",
            repeatTitle: "Repeat pattern",
            headerTitle: "Repeat event",
            end: {
                patterns: {
                    never: "Never",
                    after: "After...",
                    on: "On..."
                },
                never: "Never",
                after: "End repeat after",
                on: "End repeat on"
            },
            daily: {
                interval: ""
            },
            hourly: {
                interval: ""
            },
            weekly: {
                interval: ""
            },
            monthly: {
                interval: "",
                repeatBy: "Repeat by: ",
                dayOfMonth: "Day of the month",
                dayOfWeek: "Day of the week",
                repeatEvery: "Repeat every",
                every: "Every",
                day: "Day "
            },
            yearly: {
                interval: "",
                repeatBy: "Repeat by: ",
                dayOfMonth: "Day of the month",
                dayOfWeek: "Day of the week",
                repeatEvery: "Repeat every: ",
                every: "Every",
                month: "Month",
                day: "Day"
            }
        })), kendo.ui.Scheduler && (kendo.ui.Scheduler.prototype.options.messages = e.extend(!0, kendo.ui.Scheduler.prototype.options.messages, {
            allDay: "all day",
            date: "Date",
            event: "Event",
            time: "Time",
            showFullDay: "Show full day",
            showWorkDay: "Show business hours",
            today: "현재 날짜",
            save: "저장",
            cancel: "취소",
            destroy: "삭제",
            resetSeries: "Reset Series",
            deleteWindowTitle: "Delete event",
            ariaSlotLabel: "Selected from {0:t} to {1:t}",
            ariaEventLabel: "{0} on {1:D} at {2:t}",
            editable: {
                confirmation: "Are you sure you want to delete this event?"
            },
            views: {
                day: "일",
                week: "주",
                workWeek: "업무주간",
                agenda: "Agenda",
                month: "월"
            },
            recurrenceMessages: {
                deleteWindowTitle: "Delete Recurring Item",
                resetSeriesWindowTitle: "Reset Series",
                deleteWindowOccurrence: "Delete current occurrence",
                deleteWindowSeries: "Delete the series",
                deleteRecurringConfirmation: "Are you sure you want to delete this event occurrence?",
                deleteSeriesConfirmation: "Are you sure you want to delete the whole series?",
                editWindowTitle: "Edit Recurring Item",
                editWindowOccurrence: "Edit current occurrence",
                editWindowSeries: "Edit the series",
                deleteRecurring: "Do you want to delete only this event occurrence or the whole series?",
                editRecurring: "Do you want to edit only this event occurrence or the whole series?"
            },
            editor: {
                title: "Title",
                start: "Start",
                end: "End",
                allDayEvent: "All day event",
                description: "Description",
                repeat: "Repeat",
                timezone: " ",
                startTimezone: "Start timezone",
                endTimezone: "End timezone",
                separateTimezones: "Use separate start and end time zones",
                timezoneEditorTitle: "Timezones",
                timezoneEditorButton: "Time zone",
                timezoneTitle: "Time zones",
                noTimezone: "No timezone",
                editorTitle: "Event"
            },
            search: "Search..."
        })), kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette && (kendo.spreadsheet.messages.borderPalette = e.extend(!0, kendo.spreadsheet.messages.borderPalette, {
            allBorders: "All borders",
            insideBorders: "Inside borders",
            insideHorizontalBorders: "Inside horizontal borders",
            insideVerticalBorders: "Inside vertical borders",
            outsideBorders: "Outside borders",
            leftBorder: "Left border",
            topBorder: "Top border",
            rightBorder: "Right border",
            bottomBorder: "Bottom border",
            noBorders: "No border",
            reset: "Reset color",
            customColor: "Custom color...",
            apply: "Apply",
            cancel: "Cancel"
        })), kendo.spreadsheet && kendo.spreadsheet.messages.dialogs && (kendo.spreadsheet.messages.dialogs = e.extend(!0, kendo.spreadsheet.messages.dialogs, {
            apply: "Apply",
            save: "Save",
            cancel: "Cancel",
            remove: "Remove",
            retry: "Retry",
            revert: "Revert",
            okText: "OK",
            formatCellsDialog: {
                title: "Format",
                categories: {
                    number: "Number",
                    currency: "Currency",
                    date: "Date"
                }
            },
            fontFamilyDialog: {
                title: "Font"
            },
            fontSizeDialog: {
                title: "Font size"
            },
            bordersDialog: {
                title: "Borders"
            },
            alignmentDialog: {
                title: "Alignment",
                buttons: {
                    justtifyLeft: "Align left",
                    justifyCenter: "Center",
                    justifyRight: "Align right",
                    justifyFull: "Justify",
                    alignTop: "Align top",
                    alignMiddle: "Align middle",
                    alignBottom: "Align bottom"
                }
            },
            mergeDialog: {
                title: "Merge cells",
                buttons: {
                    mergeCells: "Merge all",
                    mergeHorizontally: "Merge horizontally",
                    mergeVertically: "Merge vertically",
                    unmerge: "Unmerge"
                }
            },
            freezeDialog: {
                title: "Freeze panes",
                buttons: {
                    freezePanes: "Freeze panes",
                    freezeRows: "Freeze rows",
                    freezeColumns: "Freeze columns",
                    unfreeze: "Unfreeze panes"
                }
            },
            confirmationDialog: {
                text: "Are you sure you want to remove this sheet?",
                title: "Sheet remove"
            },
            validationDialog: {
                title: "Data Validation",
                hintMessage: "Please enter a valid {0} value {1}.",
                hintTitle: "Validation {0}",
                criteria: {
                    any: "Any value",
                    number: "Number",
                    text: "Text",
                    date: "Date",
                    custom: "Custom Formula",
                    list: "List"
                },
                comparers: {
                    greaterThan: "greater than",
                    lessThan: "less than",
                    between: "between",
                    notBetween: "not between",
                    equalTo: "equal to",
                    notEqualTo: "not equal to",
                    greaterThanOrEqualTo: "greater than or equal to",
                    lessThanOrEqualTo: "less than or equal to"
                },
                comparerMessages: {
                    greaterThan: "greater than {0}",
                    lessThan: "less than {0}",
                    between: "between {0} and {1}",
                    notBetween: "not between {0} and {1}",
                    equalTo: "equal to {0}",
                    notEqualTo: "not equal to {0}",
                    greaterThanOrEqualTo: "greater than or equal to {0}",
                    lessThanOrEqualTo: "less than or equal to {0}",
                    custom: "that satisfies the formula: {0}"
                },
                labels: {
                    criteria: "Criteria",
                    comparer: "Comparer",
                    min: "Min",
                    max: "Max",
                    value: "Value",
                    start: "Start",
                    end: "End",
                    onInvalidData: "On invalid data",
                    rejectInput: "Reject input",
                    showWarning: "Show warning",
                    showHint: "Show hint",
                    hintTitle: "Hint title",
                    hintMessage: "Hint message",
                    ignoreBlank: "Ignore blank"
                },
                placeholders: {
                    typeTitle: "Type title",
                    typeMessage: "Type message"
                }
            },
            exportAsDialog: {
                title: "Export...",
                labels: {
                    fileName: "File name",
                    saveAsType: "Save as type",
                    exportArea: "Export",
                    paperSize: "Paper size",
                    margins: "Margins",
                    orientation: "Orientation",
                    print: "Print",
                    guidelines: "Guidelines",
                    center: "Center",
                    horizontally: "Horizontally",
                    vertically: "Vertically"
                }
            },
            modifyMergedDialog: {
                errorMessage: "Cannot change part of a merged cell."
            },
            useKeyboardDialog: {
                title: "Copying and pasting",
                errorMessage: "These actions cannot be invoked through the menu. Please use the keyboard shortcuts instead:",
                labels: {
                    forCopy: "for copy",
                    forCut: "for cut",
                    forPaste: "for paste"
                }
            },
            unsupportedSelectionDialog: {
                errorMessage: "That action cannot be performed on multiple selection."
            },
            insertCommentDialog: {
                title: "Insert comment",
                labels: {
                    comment: "Comment",
                    removeComment: "Remove comment"
                }
            },
            insertImageDialog: {
                title: "Insert image",
                info: "Drag an image here, or click to select",
                typeError: "Please select a JPEG, PNG or GIF image"
            }
        })), kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu && (kendo.spreadsheet.messages.filterMenu = e.extend(!0, kendo.spreadsheet.messages.filterMenu, {
            sortAscending: "Sort range A to Z",
            sortDescending: "Sort range Z to A",
            filterByValue: "Filter by value",
            filterByCondition: "Filter by condition",
            apply: "Apply",
            search: "Search",
            addToCurrent: "Add to current selection",
            clear: "Clear",
            blanks: "(Blanks)",
            operatorNone: "None",
            and: "AND",
            or: "OR",
            operators: {
                string: {
                    contains: "Text contains",
                    doesnotcontain: "Text does not contain",
                    startswith: "Text starts with",
                    endswith: "Text ends with"
                },
                date: {
                    eq: "Date is",
                    neq: "Date is not",
                    lt: "Date is before",
                    gt: "Date is after"
                },
                number: {
                    eq: "Is equal to",
                    neq: "Is not equal to",
                    gte: "Is greater than or equal to",
                    gt: "Is greater than",
                    lte: "Is less than or equal to",
                    lt: "Is less than"
                }
            }
        })), kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker && (kendo.spreadsheet.messages.colorPicker = e.extend(!0, kendo.spreadsheet.messages.colorPicker, {
            reset: "Reset color",
            customColor: "Custom color...",
            apply: "Apply",
            cancel: "Cancel"
        })), kendo.spreadsheet && kendo.spreadsheet.messages.toolbar && (kendo.spreadsheet.messages.toolbar = e.extend(!0, kendo.spreadsheet.messages.toolbar, {
            addColumnLeft: "Add column left",
            addColumnRight: "Add column right",
            addRowAbove: "Add row above",
            addRowBelow: "Add row below",
            alignment: "Alignment",
            alignmentButtons: {
                justtifyLeft: "Align left",
                justifyCenter: "Center",
                justifyRight: "Align right",
                justifyFull: "Justify",
                alignTop: "Align top",
                alignMiddle: "Align middle",
                alignBottom: "Align bottom"
            },
            backgroundColor: "Background",
            bold: "Bold",
            borders: "Borders",
            colorPicker: {
                reset: "Reset color",
                customColor: "Custom color..."
            },
            copy: "Copy",
            cut: "Cut",
            deleteColumn: "Delete column",
            deleteRow: "Delete row",
            excelImport: "Import from Excel...",
            filter: "Filter",
            fontFamily: "Font",
            fontSize: "Font size",
            format: "Custom format...",
            formatTypes: {
                automatic: "Automatic",
                number: "Number",
                percent: "Percent",
                financial: "Financial",
                currency: "Currency",
                date: "Date",
                time: "Time",
                dateTime: "Date time",
                duration: "Duration",
                moreFormats: "More formats..."
            },
            formatDecreaseDecimal: "Decrease decimal",
            formatIncreaseDecimal: "Increase decimal",
            freeze: "Freeze panes",
            freezeButtons: {
                freezePanes: "Freeze panes",
                freezeRows: "Freeze rows",
                freezeColumns: "Freeze columns",
                unfreeze: "Unfreeze panes"
            },
            insertComment: "Insert comment",
            insertImage: "Insert image",
            italic: "Italic",
            merge: "Merge cells",
            mergeButtons: {
                mergeCells: "Merge all",
                mergeHorizontally: "Merge horizontally",
                mergeVertically: "Merge vertically",
                unmerge: "Unmerge"
            },
            open: "Open...",
            paste: "Paste",
            quickAccess: {
                redo: "Redo",
                undo: "Undo"
            },
            saveAs: "Save As...",
            sortAsc: "Sort ascending",
            sortDesc: "Sort descending",
            sortButtons: {
                sortSheetAsc: "Sort sheet A to Z",
                sortSheetDesc: "Sort sheet Z to A",
                sortRangeAsc: "Sort range A to Z",
                sortRangeDesc: "Sort range Z to A"
            },
            textColor: "Text Color",
            textWrap: "Wrap text",
            underline: "Underline",
            validation: "Data validation..."
        })), kendo.spreadsheet && kendo.spreadsheet.messages.view && (kendo.spreadsheet.messages.view = e.extend(!0, kendo.spreadsheet.messages.view, {
            errors: {
                shiftingNonblankCells: "Cannot insert cells due to data loss possibility. Select another insert location or delete the data from the end of your worksheet.",
                filterRangeContainingMerges: "Cannot create a filter within a range containing merges",
                validationError: "The value that you entered violates the validation rules set on the cell."
            },
            tabs: {
                home: "Home",
                insert: "Insert",
                data: "Data"
            }
        })), kendo.ui.Slider && (kendo.ui.Slider.prototype.options = e.extend(!0, kendo.ui.Slider.prototype.options, {
            increaseButtonTitle: "Increase",
            decreaseButtonTitle: "Decrease"
        })), kendo.ui.ListBox && (kendo.ui.ListBox.prototype.options.messages = e.extend(!0, kendo.ui.ListBox.prototype.options.messages, {
            tools: {
                remove: "Delete",
                moveUp: "Move Up",
                moveDown: "Move Down",
                transferTo: "Transfer To",
                transferFrom: "Transfer From",
                transferAllTo: "Transfer All To",
                transferAllFrom: "Transfer All From"
            }
        })), kendo.ui.TreeList && (kendo.ui.TreeList.prototype.options.messages = e.extend(!0, kendo.ui.TreeList.prototype.options.messages, {
            noRows: "해당 목록이 없습니다.",
            loading: "Loading...",
            requestFailed: "Request failed.",
            retry: "Retry",
            commands: {
                edit: "Edit",
                update: "Update",
                canceledit: "Cancel",
                create: "Add new record",
                createchild: "Add child record",
                destroy: "Delete",
                excel: "Export to Excel",
                pdf: "Export to PDF"
            }
        })), kendo.ui.TreeView && (kendo.ui.TreeView.prototype.options.messages = e.extend(!0, kendo.ui.TreeView.prototype.options.messages, {
            loading: "Loading...",
            requestFailed: "Request failed.",
            retry: "Retry"
        })), kendo.ui.Upload && (kendo.ui.Upload.prototype.options.localization = e.extend(!0, kendo.ui.Upload.prototype.options.localization, {
            select: "파일첨부",
            cancel: "취소",
            retry: "Retry",
            remove: "Remove",
            clearSelectedFiles: "전체삭제",
            uploadSelectedFiles: "업로드",
            dropFilesHere: "업로드할 파일을 마우스로 끌어놓으세요.",
            statusUploading: "uploading",
            statusUploaded: "uploaded",
            statusWarning: "경고",
            statusFailed: "실패",
            headerStatusPaused: "Paused",
            headerStatusUploading: "Uploading...",
            headerStatusUploaded: "완료",
            uploadSuccess: "파일 업로드가 완료되었습니다.",
            uploadFail: "파일 업로드가 실패하였습니다.",
            invalidMaxFileSize: "파일 크기가 너무 큽니다.",
            invalidMinFileSize: "파일 크기가 너무 작습니다.",
            invalidFileExtension: "허용되지 않는 파일 형식입니다."
        })), kendo.ui.Validator && (kendo.ui.Validator.prototype.options.messages = e.extend(!0, kendo.ui.Validator.prototype.options.messages, {
            required: "{0} is required",
            pattern: "{0} is not valid",
            min: "{0} should be greater than or equal to {1}",
            max: "{0} should be smaller than or equal to {1}",
            step: "{0} is not valid",
            email: "{0} is not valid email",
            url: "{0} is not valid URL",
            date: "{0} is not valid date",
            dateCompare: "End date should be greater than or equal to the start date"
        })), kendo.ui.progress && (kendo.ui.progress.messages = e.extend(!0, kendo.ui.progress.messages, {
            loading: "Loading..."
        })), kendo.ui.Dialog && (kendo.ui.Dialog.prototype.options.messages = e.extend(!0, kendo.ui.Dialog.prototype.options.localization, {
            close: "Close"
        })), kendo.ui.Calendar && (kendo.ui.Calendar.prototype.options.messages = e.extend(!0, kendo.ui.Calendar.prototype.options.messages, {
            weekColumnHeader: ""
        })), kendo.ui.Alert && (kendo.ui.Alert.prototype.options.messages = e.extend(!0, kendo.ui.Alert.prototype.options.localization, {
            okText: "확인"
        })), kendo.ui.Confirm && (kendo.ui.Confirm.prototype.options.messages = e.extend(!0, kendo.ui.Confirm.prototype.options.localization, {
            okText: "확인",
            cancel: "취소"
        })), kendo.ui.Prompt && (kendo.ui.Prompt.prototype.options.messages = e.extend(!0, kendo.ui.Prompt.prototype.options.localization, {
            okText: "확인",
            cancel: "취소"
        })), kendo.ui.DateInput && (kendo.ui.DateInput.prototype.options.messages = e.extend(!0, kendo.ui.DateInput.prototype.options.messages, {
            year: "년",
            month: "월",
            day: "일",
            weekday: "day of the week",
            hour: "시",
            minute: "분",
            second: "초",
            dayperiod: "AM/PM"
        })), kendo.ui.List && (kendo.ui.List.prototype.options.messages = e.extend(!0, kendo.ui.List.prototype.options.messages, {
            clear: "지우기",
            noData: "데이터가 없습니다."
        })), kendo.ui.DropDownList && (kendo.ui.DropDownList.prototype.options.messages = e.extend(!0, kendo.ui.DropDownList.prototype.options.messages, kendo.ui.List.prototype.options.messages)), kendo.ui.ComboBox && (kendo.ui.ComboBox.prototype.options.messages = e.extend(!0, kendo.ui.ComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages)), kendo.ui.AutoComplete && (kendo.ui.AutoComplete.prototype.options.messages = e.extend(!0, kendo.ui.AutoComplete.prototype.options.messages, kendo.ui.List.prototype.options.messages)), kendo.ui.MultiColumnComboBox && (kendo.ui.MultiColumnComboBox.prototype.options.messages = e.extend(!0, kendo.ui.MultiColumnComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages)), kendo.ui.DropDownTree && (kendo.ui.DropDownTree.prototype.options.messages = e.extend(!0, kendo.ui.DropDownTree.prototype.options.messages, {
            singleTag: "(s)개 항목 선택",
            clear: "지우기",
            deleteTag: "삭제",
            noData: "데이터가 없습니다."
        })), kendo.ui.MultiSelect && (kendo.ui.MultiSelect.prototype.options.messages = e.extend(!0, kendo.ui.MultiSelect.prototype.options.messages, {
            singleTag: "개 항목 선택",
            clear: "지우기",
            deleteTag: "삭제",
            noData: "데이터가 없습니다.",
            downArrow: "select"
        })), kendo.ui.Chat && (kendo.ui.Chat.prototype.options.messages = e.extend(!0, kendo.ui.Chat.prototype.options.messages, {
            messageListLabel: "Message list",
            placeholder: "Type a message...",
            toggleButton: "Toggle toolbar",
            sendButton: "Send message"
        })), kendo.ui.Wizard && (kendo.ui.Wizard.prototype.options.messages = e.extend(!0, kendo.ui.Wizard.prototype.options.messages, {
            reset: "Reset",
            previous: "Previous",
            next: "Next",
            done: "Done",
            step: "Step",
            of: "of"
        })), kendo.ui.PDFViewer && (kendo.ui.PDFViewer.prototype.options.messages = e.extend(!0, kendo.ui.PDFViewer.prototype.options.messages, {
            defaultFileName: "Document",
            toolbar: {
                zoom: {
                    zoomLevel: "zoom level",
                    zoomOut: "Zoom Out",
                    zoomIn: "Zoom In",
                    actualWidth: "Actual Width",
                    autoWidth: "Automatic Width",
                    fitToWidth: "Fit to Width",
                    fitToPage: "Fit to Page"
                },
                open: "Open",
                exportAs: "Export",
                download: "Download",
                pager: {
                    first: "Go to the first page",
                    previous: "Go to the previous page",
                    next: "Go to the next page",
                    last: "Go to the last page",
                    of: " of {0} ",
                    page: "page",
                    pages: "pages"
                },
                print: "Print",
                toggleSelection: "Enable Selection",
                togglePan: "Enable Panning",
                search: "Search"
            },
            errorMessages: {
                notSupported: "Only pdf files allowed.",
                parseError: "PDF file fails to process.",
                notFound: "File is not found.",
                popupBlocked: "Popup is blocked."
            },
            dialogs: {
                exportAsDialog: {
                    title: "Export...",
                    defaultFileName: "Document",
                    pdf: "Portable Document Format (.pdf)",
                    png: "Portable Network Graphics (.png)",
                    svg: "Scalable Vector Graphics (.svg)",
                    labels: {
                        fileName: "File name",
                        saveAsType: "Save as",
                        page: "Page"
                    }
                },
                okText: "OK",
                save: "Save",
                cancel: "Cancel",
                search: {
                    inputLabel: "Search Text",
                    matchCase: "Match Case",
                    next: "Next Match",
                    previous: "Previous Match",
                    close: "Close",
                    of: "of"
                }
            }
        })), kendo.ui.Captcha && (kendo.ui.Captcha.prototype.options.messages = e.extend(!0, kendo.ui.Captcha.prototype.options.messages, {
            reset: "Reset captcha",
            audio: "Speak captcha",
            imageAlt: "Type the Captcha code from the image",
            success: "Verification successful"
        })), kendo.ui.OrgChart && (kendo.ui.OrgChart.prototype.options.messages = e.extend(!0, kendo.ui.OrgChart.prototype.options.messages, {
            label: "Org Chart",
            edit: "Edit",
            create: "Create",
            destroy: "Delete",
            destroyContent: "Are you sure you want to delete this item and all its children?",
            destroyTitle: "Delete item",
            cancel: "Cancel",
            save: "Save",
            menuLabel: "Edit menu",
            uploadAvatar: "Upload new avatar",
            parent: "Parent",
            name: "Name",
            title: "Title",
            none: "--None--",
            expand: "expand",
            collapse: "collapse"
        })), kendo.dataviz.ui.Map && (kendo.dataviz.ui.Map.prototype.options.messages = e.extend(!0, kendo.dataviz.ui.Map.prototype.options.messages, {
            tileTitle: "Map title"
        }))
    }(window.kendo.jQuery)
});
//# sourceMappingURL=kendo.messages.en-US.min.js.map