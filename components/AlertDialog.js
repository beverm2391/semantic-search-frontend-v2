import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const AlertDialogDemo = (props) => (
    <AlertDialog.Root open={props.alertOpen} on>
        {/* <AlertDialog.Trigger asChild>
            <button className="Button violet">Delete account</button>
        </AlertDialog.Trigger> */}
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="AlertDialogOverlay" />
            <AlertDialog.Content className="AlertDialogContent">
                <AlertDialog.Title className="AlertDialogTitle">There&apos;s a problem!</AlertDialog.Title>
                <AlertDialog.Description className="AlertDialogDescription">
                    {props.alert}
                </AlertDialog.Description>
                <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                    <AlertDialog.Cancel className="AlertDialogCancel" onClick={() => props.setAlertOpen(false)}>
                        <button><Cross2Icon className="w-6 h-6 text-gray-800 dark:text-gray-200"/></button>
                    </AlertDialog.Cancel>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
);

export default AlertDialogDemo;