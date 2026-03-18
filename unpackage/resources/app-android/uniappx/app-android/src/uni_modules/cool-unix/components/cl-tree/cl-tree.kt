@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uni.UNI63FBDF4
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uniapp.framework.*
import io.dcloud.uniapp.runtime.*
import io.dcloud.uniapp.vue.*
import io.dcloud.uniapp.vue.shared.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
import kotlin.properties.Delegates
open class GenUniModulesCoolUnixComponentsClTreeClTree : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var pt: Any by `$props`
    open var modelValue: Any? by `$props`
    open var list: UTSArray<ClTreeItem> by `$props`
    open var icon: String by `$props`
    open var expandIcon: String by `$props`
    open var checkStrictly: Boolean by `$props`
    open var checkable: Boolean by `$props`
    open var multiple: Boolean by `$props`
    open var clearChecked: () -> Unit
        get() {
            return unref(this.`$exposed`["clearChecked"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "clearChecked", value)
        }
    open var setChecked: (key: Any, flag: Boolean) -> Unit
        get() {
            return unref(this.`$exposed`["setChecked"]) as (key: Any, flag: Boolean) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "setChecked", value)
        }
    open var setCheckedKeys: (keys: UTSArray<Any>) -> Unit
        get() {
            return unref(this.`$exposed`["setCheckedKeys"]) as (keys: UTSArray<Any>) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "setCheckedKeys", value)
        }
    open var getCheckedKeys: () -> UTSArray<Any>
        get() {
            return unref(this.`$exposed`["getCheckedKeys"]) as () -> UTSArray<Any>
        }
        set(value) {
            setRefValue(this.`$exposed`, "getCheckedKeys", value)
        }
    open var getHalfCheckedKeys: () -> UTSArray<Any>
        get() {
            return unref(this.`$exposed`["getHalfCheckedKeys"]) as () -> UTSArray<Any>
        }
        set(value) {
            setRefValue(this.`$exposed`, "getHalfCheckedKeys", value)
        }
    open var setExpanded: (key: Any, flag: Boolean) -> Unit
        get() {
            return unref(this.`$exposed`["setExpanded"]) as (key: Any, flag: Boolean) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "setExpanded", value)
        }
    open var setExpandedKeys: (keys: UTSArray<Any>) -> Unit
        get() {
            return unref(this.`$exposed`["setExpandedKeys"]) as (keys: UTSArray<Any>) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "setExpandedKeys", value)
        }
    open var getExpandedKeys: () -> UTSArray<Any>
        get() {
            return unref(this.`$exposed`["getExpandedKeys"]) as () -> UTSArray<Any>
        }
        set(value) {
            setRefValue(this.`$exposed`, "getExpandedKeys", value)
        }
    open var expandAll: () -> Unit
        get() {
            return unref(this.`$exposed`["expandAll"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "expandAll", value)
        }
    open var collapseAll: () -> Unit
        get() {
            return unref(this.`$exposed`["collapseAll"]) as () -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "collapseAll", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesCoolUnixComponentsClTreeClTree, __setupCtx: SetupContext) -> Any? = fun(__props, __setupCtx): Any? {
            val __expose = __setupCtx.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesCoolUnixComponentsClTreeClTree
            val _cache = __ins.renderCache
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val pt = computed(fun(): PassThrough__20 {
                return parsePt<PassThrough__20>(props.pt)
            }
            )
            val data = ref<UTSArray<ClTreeItem>>(props.list)
            val nodeMap = computed(fun(): Map<Any, ClTreeNodeInfo> {
                val map = Map<Any, ClTreeNodeInfo>()
                fun buildMap(nodes: UTSArray<ClTreeItem>, parent: ClTreeItem? = null): Unit {
                    run {
                        var i: Number = 0
                        while(i < nodes.length){
                            val node = nodes[i]
                            map.set(node.id, ClTreeNodeInfo(node = node, parent = parent, index = i))
                            if (node.children != null && node.children!!.length > 0) {
                                buildMap(node.children!!, node)
                            }
                            i++
                        }
                    }
                }
                buildMap(data.value)
                return map
            }
            )
            fun findNodeInfo(key: Any): ClTreeNodeInfo? {
                val result = nodeMap.value.get(key)
                return if (result != null) {
                    result
                } else {
                    null
                }
            }
            fun getAncestors(key: Any): UTSArray<ClTreeItem> {
                val result: UTSArray<ClTreeItem> = _uA()
                var nodeInfo = findNodeInfo(key)
                while(nodeInfo != null && nodeInfo.parent != null){
                    result.unshift(nodeInfo.parent!!)
                    nodeInfo = findNodeInfo(nodeInfo.parent!!.id)
                }
                return result
            }
            fun gen_updateAllCheckStates_fn(): Unit {
                fun updateNodeStates(nodes: UTSArray<ClTreeItem>): Unit {
                    run {
                        var i: Number = 0
                        while(i < nodes.length){
                            val node = nodes[i]
                            val children = if (node.children != null) {
                                node.children!!
                            } else {
                                _uA()
                            }
                            if (children.length == 0) {
                                node.isHalfChecked = false
                                i++
                                continue
                            }
                            updateNodeStates(children)
                            var checkedCount: Number = 0
                            var halfCheckedCount: Number = 0
                            run {
                                var j: Number = 0
                                while(j < children.length){
                                    if (children[j].isChecked == true) {
                                        checkedCount++
                                    } else if (children[j].isHalfChecked == true) {
                                        halfCheckedCount++
                                    }
                                    j++
                                }
                            }
                            if (checkedCount == children.length) {
                                node.isChecked = true
                                node.isHalfChecked = false
                            } else if (checkedCount > 0 || halfCheckedCount > 0) {
                                node.isChecked = false
                                node.isHalfChecked = true
                            } else {
                                node.isChecked = false
                                node.isHalfChecked = false
                            }
                            i++
                        }
                    }
                }
                updateNodeStates(data.value)
            }
            val updateAllCheckStates = ::gen_updateAllCheckStates_fn
            fun updateAncestorsCheckState(key: Any): Unit {
                val ancestors = getAncestors(key)
                run {
                    var i = ancestors.length - 1
                    while(i >= 0){
                        val ancestor = ancestors[i]
                        val children = if (ancestor.children != null) {
                            ancestor.children!!
                        } else {
                            (_uA<ClTreeItem>())
                        }
                        if (children.length == 0) {
                            i--
                            continue
                        }
                        var checkedCount: Number = 0
                        var halfCheckedCount: Number = 0
                        run {
                            var j: Number = 0
                            while(j < children.length){
                                if (children[j].isChecked == true) {
                                    checkedCount++
                                } else if (children[j].isHalfChecked == true) {
                                    halfCheckedCount++
                                }
                                j++
                            }
                        }
                        if (checkedCount == children.length) {
                            ancestor.isChecked = true
                            ancestor.isHalfChecked = false
                        } else if (checkedCount > 0 || halfCheckedCount > 0) {
                            ancestor.isChecked = false
                            ancestor.isHalfChecked = true
                        } else {
                            ancestor.isChecked = false
                            ancestor.isHalfChecked = false
                        }
                        i--
                    }
                }
            }
            fun getDescendants(key: Any): UTSArray<ClTreeItem> {
                val nodeInfo = findNodeInfo(key)
                if (nodeInfo == null || nodeInfo.node.children == null) {
                    return _uA()
                }
                val result: UTSArray<ClTreeItem> = _uA()
                val queue: UTSArray<ClTreeItem> = _uA()
                run {
                    var i: Number = 0
                    while(i < nodeInfo.node.children!!.length){
                        queue.push(nodeInfo.node.children!![i])
                        i++
                    }
                }
                while(queue.length > 0){
                    val node = queue.shift()
                    if (node == null) {
                        break
                    }
                    result.push(node)
                    if (node.children != null && node.children!!.length > 0) {
                        run {
                            var i: Number = 0
                            while(i < node.children!!.length){
                                queue.push(node.children!![i])
                                i++
                            }
                        }
                    }
                }
                return result
            }
            fun gen_clearChecked_fn(): Unit {
                nodeMap.value.forEach(fun(info: ClTreeNodeInfo){
                    info.node.isChecked = false
                    info.node.isHalfChecked = false
                }
                )
            }
            val clearChecked = ::gen_clearChecked_fn
            fun setChecked(key: Any, flag: Boolean): Unit {
                val nodeInfo = findNodeInfo(key)
                if (nodeInfo == null) {
                    return
                }
                if (!props.multiple) {
                    clearChecked()
                }
                nodeInfo.node.isChecked = flag
                if (props.multiple) {
                    if (!props.checkStrictly) {
                        val descendants = getDescendants(key)
                        run {
                            var i: Number = 0
                            while(i < descendants.length){
                                descendants[i].isChecked = flag
                                i++
                            }
                        }
                        updateAncestorsCheckState(key)
                    }
                }
            }
            fun gen_setCheckedKeys_fn(keys: UTSArray<Any>): Unit {
                run {
                    var i: Number = 0
                    while(i < keys.length){
                        val key: Any = keys[i]
                        val nodeInfo = findNodeInfo(key)
                        if (nodeInfo != null) {
                            nodeInfo.node.isChecked = true
                            if (!props.checkStrictly) {
                                val descendants = getDescendants(key)
                                run {
                                    var j: Number = 0
                                    while(j < descendants.length){
                                        descendants[j].isChecked = true
                                        j++
                                    }
                                }
                            }
                        }
                        i++
                    }
                }
                if (!props.checkStrictly) {
                    updateAllCheckStates()
                }
            }
            val setCheckedKeys = ::gen_setCheckedKeys_fn
            fun gen_getCheckedKeys_fn(): UTSArray<Any> {
                val result: UTSArray<Any> = _uA()
                fun collectCheckedKeys(nodes: UTSArray<ClTreeItem>): Unit {
                    run {
                        var i: Number = 0
                        while(i < nodes.length){
                            val node = nodes[i]
                            if (node.isChecked == true) {
                                result.push(node.id)
                            }
                            if (node.children != null) {
                                collectCheckedKeys(node.children!!)
                            }
                            i++
                        }
                    }
                }
                collectCheckedKeys(data.value)
                return result
            }
            val getCheckedKeys = ::gen_getCheckedKeys_fn
            fun gen_getHalfCheckedKeys_fn(): UTSArray<Any> {
                val result: UTSArray<Any> = _uA()
                fun collectHalfCheckedKeys(nodes: UTSArray<ClTreeItem>): Unit {
                    run {
                        var i: Number = 0
                        while(i < nodes.length){
                            val node = nodes[i]
                            if (node.isHalfChecked == true) {
                                result.push(node.id)
                            }
                            if (node.children != null) {
                                collectHalfCheckedKeys(node.children!!)
                            }
                            i++
                        }
                    }
                }
                collectHalfCheckedKeys(data.value)
                return result
            }
            val getHalfCheckedKeys = ::gen_getHalfCheckedKeys_fn
            fun setExpanded(key: Any, flag: Boolean): Unit {
                val nodeInfo = findNodeInfo(key)
                if (nodeInfo == null) {
                    return
                }
                nodeInfo.node.isExpand = flag
            }
            fun gen_setExpandedKeys_fn(keys: UTSArray<Any>): Unit {
                run {
                    var i: Number = 0
                    while(i < keys.length){
                        val nodeInfo = findNodeInfo(keys[i])
                        if (nodeInfo != null) {
                            nodeInfo.node.isExpand = true
                        }
                        i++
                    }
                }
            }
            val setExpandedKeys = ::gen_setExpandedKeys_fn
            fun gen_getExpandedKeys_fn(): UTSArray<Any> {
                val result: UTSArray<Any> = _uA()
                fun collectExpandedKeys(nodes: UTSArray<ClTreeItem>): Unit {
                    run {
                        var i: Number = 0
                        while(i < nodes.length){
                            val node = nodes[i]
                            if (node.isExpand == true) {
                                result.push(node.id)
                            }
                            if (node.children != null) {
                                collectExpandedKeys(node.children!!)
                            }
                            i++
                        }
                    }
                }
                collectExpandedKeys(data.value)
                return result
            }
            val getExpandedKeys = ::gen_getExpandedKeys_fn
            fun gen_expandAll_fn(): Unit {
                nodeMap.value.forEach(fun(info: ClTreeNodeInfo){
                    if (info.node.children != null && info.node.children!!.length > 0) {
                        info.node.isExpand = true
                    }
                }
                )
            }
            val expandAll = ::gen_expandAll_fn
            fun gen_collapseAll_fn() {
                nodeMap.value.forEach(fun(info: ClTreeNodeInfo){
                    info.node.isExpand = false
                }
                )
            }
            val collapseAll = ::gen_collapseAll_fn
            fun gen_syncModelValue_fn() {
                if (isEmpty(data.value)) {
                    return
                }
                val checkedKeys = getCheckedKeys()
                if (props.modelValue == null || !isEqual(checkedKeys, props.modelValue!!)) {
                    val value = if (props.multiple) {
                        checkedKeys
                    } else {
                        first(checkedKeys)
                    }
                    emit("update:modelValue", value)
                    emit("change", value)
                }
            }
            val syncModelValue = ::gen_syncModelValue_fn
            fun gen_syncCheckedState_fn() {
                if (props.modelValue == null) {
                    return
                }
                val checkedKeys = getCheckedKeys()
                if (!isEqual(checkedKeys, props.modelValue!!)) {
                    if (UTSArray.isArray(props.modelValue)) {
                        setCheckedKeys(props.modelValue!! as UTSArray<Any>)
                    } else {
                        setChecked(props.modelValue!!, true)
                    }
                }
                syncModelValue()
            }
            val syncCheckedState = ::gen_syncCheckedState_fn
            watch(computed(fun(): UTSArray<ClTreeItem> {
                return props.list
            }
            ), fun(kVal: UTSArray<ClTreeItem>){
                data.value = kVal
                syncCheckedState()
            }
            , WatchOptions(immediate = true))
            watch(computed(fun(): UTSArray<Any> {
                return _uA(
                    props.modelValue ?: 0
                )
            }
            ), fun(){
                syncCheckedState()
            }
            , WatchOptions(immediate = true, deep = true))
            watch(data, fun(){
                if (!props.checkStrictly && props.multiple) {
                    updateAllCheckStates()
                }
                syncModelValue()
            }
            , WatchOptions(deep = true))
            __expose(_uM("icon" to computed(fun(): String {
                return props.icon
            }
            ), "expandIcon" to computed(fun(): String {
                return props.expandIcon
            }
            ), "checkStrictly" to computed(fun(): Boolean {
                return props.checkStrictly
            }
            ), "checkable" to computed(fun(): Boolean {
                return props.checkable
            }
            ), "multiple" to computed(fun(): Boolean {
                return props.multiple
            }
            ), "clearChecked" to clearChecked, "setChecked" to ::setChecked, "setCheckedKeys" to setCheckedKeys, "getCheckedKeys" to getCheckedKeys, "getHalfCheckedKeys" to getHalfCheckedKeys, "setExpanded" to ::setExpanded, "setExpandedKeys" to setExpandedKeys, "getExpandedKeys" to getExpandedKeys, "expandAll" to expandAll, "collapseAll" to collapseAll))
            return fun(): Any? {
                val _component_cl_tree_item = resolveEasyComponent("cl-tree-item", GenUniModulesCoolUnixComponentsClTreeItemClTreeItemClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "cl-tree",
                    _uA(
                        _uM<String, Any?>(),
                        pt.value.className
                    )
                ))), _uA(
                    _cE(Fragment, null, RenderHelpers.renderList(data.value, fun(item, __key, __index, _cached): Any {
                        return _cV(_component_cl_tree_item, _uM("key" to item.id, "item" to item, "level" to 0, "pt" to props.pt), null, 8, _uA(
                            "item",
                            "pt"
                        ))
                    }
                    ), 128)
                ), 2)
            }
        }
        var name = "cl-tree"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA())
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("update:modelValue" to null, "change" to null)
        var props = _nP(_uM("pt" to _uM("default" to fun(): UTSJSONObject {
            return (UTSJSONObject())
        }
        ), "modelValue" to _uM("default" to null), "list" to _uM("type" to "Array", "default" to fun(): UTSArray<Any?> {
            return _uA()
        }
        ), "icon" to _uM("type" to "String", "default" to "arrow-right-s-fill"), "expandIcon" to _uM("type" to "String", "default" to "arrow-down-s-fill"), "checkStrictly" to _uM("type" to "Boolean", "default" to false), "checkable" to _uM("type" to "Boolean", "default" to true), "multiple" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "pt",
            "modelValue",
            "list",
            "icon",
            "expandIcon",
            "checkStrictly",
            "checkable",
            "multiple"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
