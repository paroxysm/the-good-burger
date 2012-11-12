<?php
/**
 * Created by JetBrains PhpStorm.
 * User: CMK
 * Date: 11/2/12
 * Time: 9:26 PM
 * To change this template use File | Settings | File Templates.
 */
echo "Printing POST";
echo "First is : {$_POST['request_type']}";
/*$dataSentFromClient = $_POST['payload'];
$requestCallbacks = array();

//Dispatch request to callback
$callback = $requestCallbacks[ $_POST['request_type'] ];
$result = $callback( $dataSentFromClient );
echo json_encode( $result );


function handleRequestMenus( $payload ) {
    return array( Menu1, Menu2, Menu3);
}
function handleRequestMenu($payload ) {
    $payload.property1;
    $payload.property2;
    return array(Menu1);
}
handleRequestMenu($payload);
$handleRequestAsValue = handleRequestMenu;
$handleRequestAsValue( $payload);

$requestCallbacks['request_menus'] = 'handleRequestMenus';
$requestCallbacks['request_menu'] = 'handleRequestMenus';
$requestCallbacks['charge_order'] = 'handleRequestMenus';
$requestCallbacks['r'] = 'handleRequestMenus';*/

