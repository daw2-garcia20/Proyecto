<?php

abstract class DataBoundObject {

   protected $ID;
   protected $objPDO;
   protected $strTableName;
   protected $arRelationMap;
   protected $blForDeletion;
   protected $blIsLoaded;
   protected $arModifiedRelations;

   abstract protected function DefineTableName();
   abstract protected function DefineRelationMap();

   public function __construct(PDO $objPDO, $id = NULL) {
      $this->strTableName = $this->DefineTableName();
      $this->arRelationMap = $this->DefineRelationMap();
      $this->objPDO = $objPDO;
      $this->blIsLoaded = false;
      if (isset($id)) {
         $this->ID = $id;
      };
      $this->arModifiedRelations = array();
   }

   public function Load() {
      if (isset($this->ID)) {
		$strQuery = "SELECT ";
        foreach ($this->arRelationMap as $key => $value) {
			$strQuery .= "\"" . $key . "\",";
        }
        $strQuery = substr($strQuery, 0, strlen($strQuery)-1);
        $strQuery .= " FROM " . $this->strTableName . " WHERE \"id\" = :eid";
        $objStatement = $this->objPDO->prepare($strQuery);
        $objStatement->bindParam(':eid', $this->ID, PDO::PARAM_INT);
        $objStatement->execute();
        $arRow = $objStatement->fetch(PDO::FETCH_ASSOC);
        foreach($arRow as $key => $value) {
            $strMember = $this->arRelationMap[$key];
            if (property_exists($this, $strMember)) {
                if (is_numeric($value)) {
                   eval('$this->'.$strMember.' = '.$value.';');
                } else {
                   eval('$this->'.$strMember.' = "'.$value.'";');
                };
            };
         };
         $this->blIsLoaded = true;
      };
   }

   public function All(){
      $arrayID = array();
      $query = "SELECT id FROM "  . $this->strTableName . "";
      $statement = $this->objPDO->prepare($query);
      $statement->execute();
      $result = $statement->fetchAll();
      
      foreach($result as $row) {
         $arrayID[] = $row["id"];
      };

      return $arrayID;
   }

   public function LoadMoreViews(){
         $strQuery = "SELECT ";
           foreach ($this->arRelationMap as $key => $value) {
            $strQuery .= "\"" . $key . "\",";
           }
           $strQuery = substr($strQuery, 0, strlen($strQuery)-1);
           $strQuery .= " FROM " . $this->strTableName . " ORDER BY visitas DESC LIMIT 1";
           $objStatement = $this->objPDO->prepare($strQuery);
           $objStatement->execute();
           $arRow = $objStatement->fetch(PDO::FETCH_ASSOC);
           foreach($arRow as $key => $value) {
               $strMember = $this->arRelationMap[$key];
               if (property_exists($this, $strMember)) {
                   if (is_numeric($value)) {
                      eval('$this->'.$strMember.' = '.$value.';');
                   } else {
                      eval('$this->'.$strMember.' = "'.$value.'";');
                   };
               };
            };
            $this->blIsLoaded = true;
   }

   public function obtenerFiltrados($fecha, $hora){
      $arrayID = array();
      $hora = str_replace(":","",$hora);
      $query = "SELECT " . $this->strTableName . ".servicio_id FROM "  . $this->strTableName . " WHERE fecha = '" . $fecha . "' AND hora = '" . $hora . "00'";
      $statement = $this->objPDO->prepare($query);
      $statement->execute();
      $result = $statement->fetchAll();
      
      foreach($result as $row) {
         $arrayID[] = $row["servicio_id"];
      };

      return $arrayID; 
   }

   public function inicioSesion($usuario,$password){
      $query = "SELECT " . $this->strTableName . ".id FROM "  . $this->strTableName . " WHERE username = '" . $usuario . "' AND password = '" . $password . "'";
      $statement = $this->objPDO->prepare($query);
      $statement->execute();
      $result = $statement->fetchAll();
      
      $id = $result[0]['id'];

      return $id;
   }

   public function Trabajador($id){
      $arrayID = array();
      $query = "SELECT " . $this->strTableName . ".id FROM "  . $this->strTableName . " WHERE trabajador_id = " . $id;
      $statement = $this->objPDO->prepare($query);
      $statement->execute();
      $result = $statement->fetchAll();
      
      foreach($result as $row) {
         $arrayID[] = $row["id"];
      };

      return $arrayID;
   }

   public function Save() {
       $actualVal = "";
      if (isset($this->ID)) {
         $strQuery = 'UPDATE "' . $this->strTableName . '" SET ';
         foreach ($this->arRelationMap as $key => $value) {
            eval('$actualVal = &$this->' . $value . ';');
            if (array_key_exists($value, $this->arModifiedRelations)) {
               $strQuery .= '"' . $key . "\" = :$value, ";
            };
         }
         $strQuery = substr($strQuery, 0, strlen($strQuery)-2);
         $strQuery .= ' WHERE "id" = :eid';
         unset($objStatement);
         $objStatement = $this->objPDO->prepare($strQuery);
         $objStatement->bindValue(':eid', $this->ID, PDO::PARAM_INT);
         foreach ($this->arRelationMap as $key => $value) {
            eval('$actualVal = &$this->' . $value . ';');
            if (array_key_exists($value, $this->arModifiedRelations)) {
               if ((is_int($actualVal)) || ($actualVal == NULL)) {
                  $objStatement->bindValue(':' . $value, $actualVal,PDO::PARAM_INT);
               } else {
                  $objStatement->bindValue(':' . $value, $actualVal,PDO::PARAM_STR);
               };
            };
         };
         $objStatement->execute();
      } else {
         $strValueList = "";
         $strQuery = 'INSERT INTO "' . $this->strTableName . '"(';
         foreach ($this->arRelationMap as $key => $value) {
            eval('$actualVal = &$this->' . $value . ';');
            if (isset($actualVal)) {
               if (array_key_exists($value, $this->arModifiedRelations)) {
                  $strQuery .= '"' . $key . '", ';
                  $strValueList .= ":$value, ";
               };
            };
         }
         $strQuery = substr($strQuery, 0, strlen($strQuery) - 2);
         $strValueList = substr($strValueList, 0, strlen($strValueList) - 2);
         $strQuery .= ") VALUES (";
         $strQuery .= $strValueList;
         $strQuery .= ")";

         unset($objStatement);
         $objStatement = $this->objPDO->prepare($strQuery);
         foreach ($this->arRelationMap as $key => $value) {
            eval('$actualVal = &$this->' . $value . ';');
            if (isset($actualVal)) {   
               if (array_key_exists($value, $this->arModifiedRelations)) {
                  if ((is_int($actualVal)) || ($actualVal == NULL)) {
                     $objStatement->bindValue(':' . $value, $actualVal, PDO::PARAM_INT);
                  } else {
                     $objStatement->bindValue(':' . $value, $actualVal, PDO::PARAM_STR);
                  };
               };
            };
         }
         $objStatement->execute();
         $this->ID = $this->objPDO->lastInsertId($this->strTableName . "_id_seq");
      }
   }

   public function MarkForDeletion() {
      $this->blForDeletion = true;
   }
   
   public function __destruct() {
      if (isset($this->ID)) {   
         if ($this->blForDeletion == true) {
            $strQuery = 'DELETE FROM "' . $this->strTableName . '" WHERE "id" = :eid';
            $objStatement = $this->objPDO->prepare($strQuery);
            $objStatement->bindValue(':eid', $this->ID, PDO::PARAM_INT);   
            $objStatement->execute();
         };
      }
   }

   public function __call($strFunction, $arArguments) {

      $strMethodType = substr($strFunction, 0, 3);
      $strMethodMember = substr($strFunction, 3);
      switch ($strMethodType) {
         case "set":
            return($this->SetAccessor($strMethodMember, $arArguments[0]));
            break;
         case "get":
            return($this->GetAccessor($strMethodMember));   
      };
      return(false);   
   }

   private function SetAccessor($strMember, $strNewValue) {
      if (property_exists($this, $strMember)) {
         if (is_numeric($strNewValue)) { 
            eval('$this->' . $strMember . ' = ' . $strNewValue . ';');
         } else {
            eval('$this->' . $strMember . ' = "' . $strNewValue . '";');
         };
         $this->arModifiedRelations[$strMember] = "1";
         return $this;
      } else {
         return(false);
      };   
   }

   private function GetAccessor($strMember) {
       $strRetVal = "";
      if ($this->blIsLoaded != true) {
         $this->Load();
      }
      if (property_exists($this, $strMember)) {
         eval('$strRetVal = $this->' . $strMember . ';');
         return($strRetVal);
      } else {
         return(false);
      };   
   }
   
}

?>
