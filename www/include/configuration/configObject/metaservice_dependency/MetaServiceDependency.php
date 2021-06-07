<?php

/*
 * Copyright 2005-2015 Centreon
 * Centreon is developped by : Julien Mathis and Romain Le Merlus under
 * GPL Licence 2.0.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation ; either version 2 of the License.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, see <http://www.gnu.org/licenses>.
 *
 * Linking this program statically or dynamically with other modules is making a
 * combined work based on this program. Thus, the terms and conditions of the GNU
 * General Public License cover the whole combination.
 *
 * As a special exception, the copyright holders of this program give Centreon
 * permission to link this program with independent modules to produce an executable,
 * regardless of the license terms of these independent modules, and to copy and
 * distribute the resulting executable under terms of Centreon choice, provided that
 * Centreon also meet, for each linked independent module, the terms  and conditions
 * of the license of that module. An independent module is a module which is not
 * derived from this program. If you modify this program, you may extend this
 * exception to your version of the program, but you are not obliged to do so. If you
 * do not wish to do so, delete this exception statement from your version.
 *
 * For more information : contact@centreon.com
 *
 */

if (!isset($centreon)) {
    exit();
}

#Path to the configuration dir
$path = "./include/configuration/configObject/metaservice_dependency/";

#PHP functions
require_once $path . "DB-Func.php";
require_once "./include/common/common-Func.php";

$dep_id = filter_var(
    $_GET['dep_id'] ?? $_POST['dep_id'] ?? null,
    FILTER_VALIDATE_INT
);

$select = filter_var_array(
    getSelectOption(),
    FILTER_VALIDATE_INT
);

$dupNbr = filter_var_array(
    getDuplicateNumberOption(),
    FILTER_VALIDATE_INT
);

/* Set the real page */
if ($ret['topology_page'] != "" && $p != $ret['topology_page']) {
    $p = $ret['topology_page'];
}

$acl = $oreon->user->access;
$metastr = $acl->getMetaServiceString();

switch ($o) {
    case "a": # Add a Meta Service
    case "w": # Watch a Meta Service
    case "c": # Modify a Meta Service
        require_once($path . "formMetaServiceDependency.php");
        break;
    case "m": # Duplicate n Meta Services
        multipleMetaServiceDependencyInDB(
            is_array($select) ? $select : array(),
            is_array($dupNbr) ? $dupNbr : array()
        );
        require_once($path . "listMetaServiceDependency.php");
        break;
    case "d": # Delete n Meta Service
        deleteMetaServiceDependencyInDB(is_array($select) ? $select : array());
        require_once($path . "listMetaServiceDependency.php");
        break;
    default:
        require_once($path . "listMetaServiceDependency.php");
        break;
}
